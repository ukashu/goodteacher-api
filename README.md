TODO:
  - prevent user email enumeration in some way (maybe limit user creation requests)
  - TTL for not accepted invites
  - TTL for not confirmed accounts
  - consider gatekeeping student/teacher in auth middleware for safety
  - resend email confirmation functionality
  - handle prisma errors in error middleware
  - more descriptive error messages for development, for production change to less descriptive

teacher id 22 session token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjIsImlhdCI6MTY4MzcyMjgwMywiZXhwIjoxNjgzODA5MjAzfQ.hutazaOQr7Dx6ow96-0090ZN6ZwEKgSfvHFfl4gfW5Y
student id 30 session token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzAsImlhdCI6MTY4MzgwNDI1MywiZXhwIjoxNjg2Mzk2MjUzfQ.HBPK6R9rIuH3YYZfMwypjM_t9UuWeY_CpDDrEf_oaAY
teacher id 32 session token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImlhdCI6MTY4MzgxMTA0NiwiZXhwIjoxNjg2NDAzMDQ2fQ.mgGhNnoMSvoOUwKGzP-9HqUjME-iqa-A9ewDils_LiY