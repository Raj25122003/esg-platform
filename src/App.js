import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

import Login from './Login';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell
} from 'recharts';

function App() {

  const [isLoggedIn, setIsLoggedIn] =
    useState(false);

  const [file, setFile] = useState(null);

  const [data, setData] = useState([]);

  const [sourceType, setSourceType] =
    useState('SAP');

  const [search, setSearch] = useState('');

  const [statusFilter, setStatusFilter] =
    useState('ALL');

  const [currentPage, setCurrentPage] =
    useState(1);

  const recordsPerPage = 5;

  const totalRecords = data.length;

  const approvedRecords = data.filter(
    item => item.status === 'APPROVED'
  ).length;

  const rejectedRecords = data.filter(
    item => item.status === 'REJECTED'
  ).length;

  const suspiciousRecords = data.filter(
    item => item.is_suspicious
  ).length;

  const pendingRecords = data.filter(
    item => item.status === 'PENDING'
  ).length;

  const filteredData = data.filter((item) => {

    const matchesSearch =
      item.activity_type
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesStatus =

      statusFilter === 'ALL'
        ? true
        : item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const lastIndex =
    currentPage * recordsPerPage;

  const firstIndex =
    lastIndex - recordsPerPage;

  const currentRecords =
    filteredData.slice(
      firstIndex,
      lastIndex
    );

  const totalPages = Math.ceil(
    filteredData.length / recordsPerPage
  );

  const chartData = [

    {
      name: 'Approved',
      value: approvedRecords
    },

    {
      name: 'Rejected',
      value: rejectedRecords
    },

    {
      name: 'Suspicious',
      value: suspiciousRecords
    }

  ];

  const COLORS = [
    'green',
    'red',
    'orange'
  ];

  const activityData = [];

  data.forEach((item) => {

    const existing =
      activityData.find(
        x =>
          x.activity ===
          item.activity_type
      );

    if (existing) {

      existing.quantity +=
        Number(item.quantity);

    } else {

      activityData.push({

        activity:
          item.activity_type,

        quantity:
          Number(item.quantity)

      });
    }
  });

  const fetchData = async () => {

    try {

      const response =
        await axios.get(
          'https://esg-backend-17af.onrender.com/api/data/'
        );

      setData(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {

    fetchData();

  }, []);

  const updateStatus = async (
    id,
    status
  ) => {

    try {

      await axios.post(

        `https://esg-backend-17af.onrender.com/api/approve/${id}/`,

        {
          status: status
        }

      );

      fetchData();

    } catch (error) {

      console.log(error);
    }
  };

  const handleUpload = async () => {

    if (!file) {

      alert("Please select a file");

      return;
    }

    const formData =
      new FormData();

    formData.append(
      'file',
      file
    );

    formData.append(
      'source_type',
      sourceType
    );

    try {

      const response =
        await axios.post(

          'https://esg-backend-17af.onrender.com/api/upload/',

          formData,

          {
            headers: {
              'Content-Type':
                'multipart/form-data'
            }
          }

        );

      alert(
        response.data.message
      );

      fetchData();

    } catch (error) {

      console.log(error);

      alert("Upload failed");
    }
  };

  const downloadCSV = () => {

    let csvContent =
      'Source,Activity,Quantity,Unit,Status\n';

    data.forEach((item) => {

      csvContent +=

`${item.source_type},
${item.activity_type},
${item.quantity},
${item.unit},
${item.status}\n`;

    });

    const blob = new Blob(
      [csvContent],
      {
        type: 'text/csv'
      }
    );

    const url =
      window.URL.createObjectURL(
        blob
      );

    const a =
      document.createElement('a');

    a.href = url;

    a.download =
      'esg_report.csv';

    a.click();
  };

  if (!isLoggedIn) {

    return (
      <Login
        setIsLoggedIn={
          setIsLoggedIn
        }
      />
    );
  }

  return (

    <div style={{ padding: '40px' }}>

      <h1>
        ESG Data Platform
      </h1>

      <button
        onClick={() =>
          setIsLoggedIn(false)
        }
        style={{

          position: 'fixed',

          bottom: '20px',

          right: '20px',

          backgroundColor: '#dc2626',

          color: 'white',

          border: 'none',

          padding: '12px 20px',

          borderRadius: '10px',

          cursor: 'pointer',

          fontWeight: 'bold',

          fontSize: '16px',

          boxShadow:
            '0 4px 10px rgba(0,0,0,0.2)',

          zIndex: 1000

        }}
      >

        Logout

      </button>

      <div className="dashboard-cards">

        <div className="dashboard-card">
          <h3>Total</h3>
          <h1>{totalRecords}</h1>
        </div>

        <div className="dashboard-card">
          <h3>Approved</h3>
          <h1>
            {approvedRecords}
          </h1>
        </div>

        <div className="dashboard-card">
          <h3>Rejected</h3>
          <h1>
            {rejectedRecords}
          </h1>
        </div>

        <div className="dashboard-card">
          <h3>Suspicious</h3>
          <h1>
            {suspiciousRecords}
          </h1>
        </div>

      </div>

      <div className="upload-section">

        <h2>
          Upload ESG Data
        </h2>

        <input
          type="file"
          onChange={(e) =>
            setFile(
              e.target.files[0]
            )
          }
        />

        <br /><br />

        <select
          value={sourceType}
          onChange={(e) =>
            setSourceType(
              e.target.value
            )
          }
        >

          <option value="SAP">
            SAP
          </option>

          <option value="UTILITY">
            UTILITY
          </option>

          <option value="TRAVEL">
            TRAVEL
          </option>

        </select>

        <button
          onClick={handleUpload}
          style={{
            marginLeft: '10px',
            backgroundColor:
              '#2563eb',
            color: 'white'
          }}
        >
          Upload File
        </button>

        <button
          onClick={downloadCSV}
          style={{
            marginLeft: '10px',
            backgroundColor:
              '#111827',
            color: 'white'
          }}
        >
          Download Report
        </button>

      </div>

      <div className="upload-section">

        <h2>
          AI ESG Insights
        </h2>

        <p>
          • {suspiciousRecords}
          suspicious records
          detected
        </p>

        <p>
          • {approvedRecords}
          approved ESG records
        </p>

        <p>
          • {rejectedRecords}
          rejected ESG records
        </p>

        <p>
          • {pendingRecords}
          records pending review
        </p>

        <p>

          • ESG Risk Level:

          {
            suspiciousRecords >= 3
              ? ' HIGH'
              : suspiciousRecords >= 1
              ? ' MEDIUM'
              : ' LOW'
          }

        </p>

      </div>

      <h2>
        Uploaded ESG Records
      </h2>

      <input
        type="text"
        placeholder="Search activity..."
        value={search}
        onChange={(e) => {

          setSearch(
            e.target.value
          );

          setCurrentPage(1);
        }}
      />

      <br /><br />

      <select
        value={statusFilter}
        onChange={(e) =>
          setStatusFilter(
            e.target.value
          )
        }
      >

        <option value="ALL">
          All Records
        </option>

        <option value="APPROVED">
          Approved
        </option>

        <option value="REJECTED">
          Rejected
        </option>

        <option value="PENDING">
          Pending
        </option>

      </select>

      <table>

        <thead>

          <tr>

            <th>Source</th>

            <th>Activity</th>

            <th>Quantity</th>

            <th>Unit</th>

            <th>Suspicious</th>

            <th>Status</th>

            <th>Actions</th>

          </tr>

        </thead>

        <tbody>

          {currentRecords.map(
            (item) => (

              <tr key={item.id}>

                <td>
                  {item.source_type}
                </td>

                <td>
                  {item.activity_type}
                </td>

                <td>
                  {item.quantity}
                </td>

                <td>
                  {item.unit}
                </td>

                <td>
                  {
                    item.is_suspicious
                      ? 'YES ⚠️'
                      : 'NO'
                  }
                </td>

                <td>

                  <span

                    className={
                      item.status ===
                      'APPROVED'
                        ? 'status-approved'
                        : item.status ===
                          'REJECTED'
                        ? 'status-rejected'
                        : 'status-pending'
                    }

                  >

                    {item.status}

                  </span>

                </td>

                <td>

                  <button
                    onClick={() =>
                      updateStatus(
                        item.id,
                        'APPROVED'
                      )
                    }
                    style={{
                      backgroundColor:
                        'green',
                      color: 'white'
                    }}
                  >
                    Approve
                  </button>

                  <button
                    onClick={() =>
                      updateStatus(
                        item.id,
                        'REJECTED'
                      )
                    }
                    style={{
                      marginLeft:
                        '10px',
                      backgroundColor:
                        'red',
                      color: 'white'
                    }}
                  >
                    Reject
                  </button>

                </td>

              </tr>

            )
          )}

        </tbody>

      </table>

      <div className="pagination">

        <button
          disabled={
            currentPage === 1
          }
          onClick={() =>
            setCurrentPage(
              currentPage - 1
            )
          }
        >
          Previous
        </button>

        <span>

          Page {currentPage}
          of {totalPages}

        </span>

        <button
          disabled={
            currentPage ===
            totalPages
          }
          onClick={() =>
            setCurrentPage(
              currentPage + 1
            )
          }
        >
          Next
        </button>

      </div>

      <h2
        style={{
          marginTop: '50px'
        }}
      >
        ESG Analytics Dashboard
      </h2>

      <div className="chart-container">

        <div>

          <h3>
            Activity Quantity
          </h3>

          <BarChart
            width={500}
            height={300}
            data={activityData}
          >

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="activity" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="quantity"
              fill="#2563eb"
            />

          </BarChart>

        </div>

        <div>

          <h3>
            Status Overview
          </h3>

          <PieChart
            width={400}
            height={300}
          >

            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              dataKey="value"
              label
            >

              {chartData.map(
                (
                  entry,
                  index
                ) => (

                  <Cell
                    key={index}
                    fill={
                      COLORS[index]
                    }
                  />

                )
              )}

            </Pie>

            <Tooltip />

          </PieChart>

        </div>

      </div>

    </div>
  );
}

export default App;