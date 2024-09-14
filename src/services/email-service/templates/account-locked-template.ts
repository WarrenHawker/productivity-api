const accountLockedTemplate = (name: string, ip: string) => {
  const text = `
    Hello ${name},

    Your account has been locked due to to many failed signin attempts from 
    ip: ${ip}

    Take action to secure your account.
    Productivity app
  `;

  const html = `
  <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Account Locked Due to Failed Sign-In Attempts</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            color: #333;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        h2 {
            color: #e74c3c;
            font-size: 24px;
        }
        p {
            font-size: 16px;
            line-height: 1.5;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #3498db;
            color: #fff;
            text-decoration: none;
            border-radius: 4px;
            font-size: 16px;
            margin-top: 20px;
        }
        .footer {
            margin-top: 40px;
            font-size: 12px;
            color: #777;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>Hello, ${name}</h2>
        <p>We wanted to let you know that your account has been locked due to too many failed sign-in attempts from the following IP address:</p>
        <p><strong>IP Address:</strong> ${ip}</p>
        <p>To protect your account, we've temporarily restricted access. Please take the necessary steps to secure your account.</p>
    </div>
</body>
</html>

  `;

  return { text, html };
};

export default accountLockedTemplate;
