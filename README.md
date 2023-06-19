TODO:
  - prevent user email enumeration in some way (maybe limit user creation requests)
  - TTL for not accepted invites
  - TTL for not confirmed accounts
  - consider gatekeeping student/teacher in auth middleware for safety
  - resend email confirmation functionality
  - handle prisma errors in error middleware
  - more descriptive error messages for development, for production change to less descriptive
  - change tasks: remove user_id and class_id fields and add users_classes_id (consider this, although class id and user id might be more futureptoof(request all tasks in bulk))
  - Add due date property to tasks (or don't)
  - Add name, content to tasks
  - Add class_name to users_classes
  - update task state should update true -> false and false -> true
  - task deletion should be happening in bulk 
  - make task content optional
  - on deleting user, tasks do not get deleted
  - more descriptive error for user already in class
  - add test error middleware
  - remove test error middleware
  - error logging
  - handle unsuccessfull confirmation email sending DONE
  - add orderBy to getTasks DONE
  - add translation to API messages

teacher id 22 session token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjIsImlhdCI6MTY4MzcyMjgwMywiZXhwIjoxNjgzODA5MjAzfQ.hutazaOQr7Dx6ow96-0090ZN6ZwEKgSfvHFfl4gfW5Y
student id 30 session token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzAsImlhdCI6MTY4MzgwNDI1MywiZXhwIjoxNjg2Mzk2MjUzfQ.HBPK6R9rIuH3YYZfMwypjM_t9UuWeY_CpDDrEf_oaAY
teacher id 32 session token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImlhdCI6MTY4MzgxMTA0NiwiZXhwIjoxNjg2NDAzMDQ2fQ.mgGhNnoMSvoOUwKGzP-9HqUjME-iqa-A9ewDils_LiY
teacher id 33 session token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzMsImlhdCI6MTY4NDE0MDU0MywiZXhwIjoxNjg2NzMyNTQzfQ.mAoRASe1ca6aCbLeaeHGynXcwKMQn2gQ4BZWLt-59rw
student id 34 session token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzQsImlhdCI6MTY4NDE0MTE3MSwiZXhwIjoxNjg2NzMzMTcxfQ.68yBxDgB5T2KYfZZbgAI-rkJHwzKvZJMMxyZcFDt4_M