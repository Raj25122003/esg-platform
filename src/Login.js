import { useState } from 'react';

function Login({ setIsLoggedIn }) {

  const [username, setUsername] =
    useState('');

  const [password, setPassword] =
    useState('');

  const handleLogin = () => {

    if (
      username === 'admin'
      &&
      password === 'admin123'
    ) {

      setIsLoggedIn(true);

    } else {

      alert('Invalid Credentials');
    }
  };

  return (

    <div
      style={{

        display: 'flex',

        minHeight: '100vh',

        fontFamily: 'Arial, sans-serif',

        backgroundColor: '#f3f4f6',

        overflow: 'hidden'

      }}
    >

      {/* LEFT SECTION */}

      <div
        style={{

          flex: 0.9,

          padding: '25px 45px',

          background:
            'linear-gradient(to bottom right, #f0fdf4, #ffffff)',

          display: 'flex',

          flexDirection: 'column',

          justifyContent: 'center'

        }}
      >

        {/* LOGO */}

        <div
          style={{

            display: 'flex',

            alignItems: 'center',

            marginBottom: '25px'

          }}
        >

          <div
            style={{

              width: '28px',

              height: '28px',

              border:
                '4px solid #14b8a6',

              borderLeft:
                '4px solid transparent',

              transform:
                'rotate(45deg)',

              marginRight: '12px'

            }}
          />

          <h1
            style={{

              fontSize: '30px',

              margin: 0,

              color: '#111827',

              letterSpacing: '1px'

            }}
          >

            BREATHE ESG

          </h1>

        </div>

        <h1
          style={{

            fontSize: '42px',

            lineHeight: '52px',

            color: '#111827',

            marginBottom: '25px'

          }}
        >

          <span
            style={{
              color: '#22c55e'
            }}
          >
            AI-Powered
          </span>

          <br />

          ESG Reporting
          <br />

          and Scope 3
          <br />

          Solutions

        </h1>

        <p
          style={{

            fontSize: '16px',

            color: '#4b5563',

            lineHeight: '30px',

            maxWidth: '600px'

          }}
        >

          Simplify compliance,
          track emissions,
          and drive sustainability
          with ESG reporting
          services built for
          transparency,
          performance,
          and scale.

        </p>

        <div style={{ marginTop: '20px' }}>

          <h2
            style={{
              color: '#16a34a',
              fontSize: '22px'
            }}
          >
            ✔ AI-Powered Insights
          </h2>

          <p
            style={{
              color: '#4b5563',
              fontSize: '16px'
            }}
          >
            Leverage AI to uncover ESG trends.
          </p>

          <h2
            style={{
              color: '#16a34a',
              marginTop: '18px',
              fontSize: '22px'
            }}
          >
            ✔ Ensure Compliance
          </h2>

          <p
            style={{
              color: '#4b5563',
              fontSize: '16px'
            }}
          >
            Stay ahead of regulations.
          </p>

          <h2
            style={{
              color: '#16a34a',
              marginTop: '18px',
              fontSize: '22px'
            }}
          >
            ✔ Drive Sustainability
          </h2>

          <p
            style={{
              color: '#4b5563',
              fontSize: '16px'
            }}
          >
            Create real environmental impact.
          </p>

        </div>

      </div>

      {/* RIGHT SECTION */}

      <div
        style={{

          flex: 0.8,

          display: 'flex',

          justifyContent: 'center',

          alignItems: 'center',

          padding: '20px'

        }}
      >

        <div
          style={{

            backgroundColor: 'white',

            width: '430px',

            padding: '35px',

            borderRadius: '25px',

            boxShadow:
              '0 10px 30px rgba(0,0,0,0.08)'

          }}
        >

          {/* SMALL LOGO */}

          <div
            style={{

              width: '40px',

              height: '40px',

              border:
                '5px solid #14b8a6',

              borderLeft:
                '5px solid transparent',

              transform:
                'rotate(45deg)',

              margin:
                '0 auto 20px auto'

            }}
          />

          <h1
            style={{

              textAlign: 'center',

              fontSize: '42px',

              color: '#111827',

              marginBottom: '8px'

            }}
          >

            Welcome back

          </h1>

          <p
            style={{

              textAlign: 'center',

              color: '#6b7280',

              fontSize: '18px',

              marginBottom: '30px'

            }}
          >

            Sign in to your ESG account

          </p>

          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
            style={{

              width: '100%',

              padding: '16px',

              marginBottom: '18px',

              borderRadius: '12px',

              border:
                '1px solid #d1d5db',

              fontSize: '16px',

              outline: 'none'

            }}
          />

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            style={{

              width: '100%',

              padding: '16px',

              marginBottom: '25px',

              borderRadius: '12px',

              border:
                '1px solid #d1d5db',

              fontSize: '16px',

              outline: 'none'

            }}
          />

          <button
            onClick={handleLogin}
            style={{

              width: '100%',

              padding: '16px',

              backgroundColor: '#16a34a',

              color: 'white',

              border: 'none',

              borderRadius: '12px',

              fontSize: '20px',

              fontWeight: 'bold',

              cursor: 'pointer'

            }}
          >

            Sign In

          </button>

        </div>

      </div>

    </div>
  );
}

export default Login;