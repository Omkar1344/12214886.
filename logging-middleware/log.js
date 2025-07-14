const axios = require('axios');

// Save your token here after getting from auth
const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJvbWthci5wcmFkaXBtb3JlMDA1QGdtYWlsLmNvbSIsImV4cCI6MTc1MjQ3MTE1OSwiaWF0IjoxNzUyNDcwMjU5LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiZDA0YjE2ZDQtM2UyMy00ZGM2LTg1YTQtNjUwZDJiYmQxZmZmIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoib21rYXIgcHJhZGlwIG1vcmUiLCJzdWIiOiJjNDQwZjQ1MS1hMmVjLTRhZDYtYWRiYy1jNDJiNzg2MjQwMDkifSwiZW1haWwiOiJvbWthci5wcmFkaXBtb3JlMDA1QGdtYWlsLmNvbSIsIm5hbWUiOiJvbWthciBwcmFkaXAgbW9yZSIsInJvbGxObyI6IjEyMjE0ODg2IiwiYWNjZXNzQ29kZSI6IkNaeXBRSyIsImNsaWVudElEIjoiYzQ0MGY0NTEtYTJlYy00YWQ2LWFkYmMtYzQyYjc4NjI0MDA5IiwiY2xpZW50U2VjcmV0IjoiZXhYWVV4SlROZ21ZTk5TUCJ9.ADWqB5iYEL4Qwbx7Jit0N3goACpUSUnvHiSpuiOTGn0';

// Reusable log function
function Log(stack, level, pkg, message) {
  const validStacks = ['backend', 'frontend'];
  const validLevels = ['debug', 'info', 'warn', 'fatal'];
  const validPackages = [
    // Backend only
    'cache', 'controller', 'cron-job', 'domain', 'handler', 'repository', 'route', 'service',
    // Frontend only
    'api', 'component', 'hook', 'page', 'state', 'style',
    // Shared
    'auth', 'config', 'middleware', 'utils'
  ];

  // Basic input validation
  if (!validStacks.includes(stack)) {
    console.warn(`[Log] Invalid stack: ${stack}`);
    return;
  }
  if (!validLevels.includes(level)) {
    console.warn(`[Log] Invalid level: ${level}`);
    return;
  }
  if (!validPackages.includes(pkg)) {
    console.warn(`[Log] Invalid package: ${pkg}`);
    return;
  }

  const logData = {
    stack,
    level,
    package: pkg,
    message
  };

  axios.post('http://20.244.56.144/evaluation-service/logs', logData, {
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      'Content-Type': 'application/json'
    }
  })
    .then(res => {
      console.log(`[Log] ✅ Logged: ${message}`);
    })
    .catch(err => {
      console.error(`[Log] ❌ Failed to log:`, err.response?.data || err.message);
    });
}

module.exports = Log;
