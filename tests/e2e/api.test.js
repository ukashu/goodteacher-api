describe('when not logged in ', ()=>{
  test('can register as student and log in')
  test('can register as teacher and log in')
  describe('and accessing other peoples classes ', ()=>{
    //before all create user + class + add student + add task
    //after all delete user
    test('cannot delete class')
    test('cannot add student to class')
    test('cannot remove student from class')
    test('cannot add tasks')
    test('cannot remove tasks')
    test('cannot complete tasks')
  })
})

describe('when logged in as teacher ', ()=>{
  //before each register and login and save token for requests
  //after each delete created user
  test('can create class')

  describe('when class created ', ()=>{
    //before each create class
    test('can delete class')
    test('can add student')

    describe('when added a student to class ', ()=>{
      //before each create student and add him to class
      test('can remove student from class')
      test('can add task for student')

      describe('when added a task for student ', ()=>{
        //before each add task for student
        test('can complete the task')
        test('can uncomplete the task')
        test('can remove the task')
        
        describe('and accessing other peoples classes ', ()=>{
          //before all create user and use his tokens for requests
          //after all delete user
          test('cannot delete class')
          test('cannot add student to class')
          test('cannot remove student from class')
          test('cannot add tasks')
          test('cannot remove tasks')
          test('cannot complete tasks')
        })
      })
    })
  })
})