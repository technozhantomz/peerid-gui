export const translationObject = {
  en: {
    cancel: 'Cancel',
    errors: {
      loggedOut: 'You have been logged out. Please login again.',
      username: {
        requirement: {
          length: 'Should be between 3 & 60 chars long',
          beginsWithLetter: 'Begins with letter',
          endsWithLowercaseOrDigit: 'Ends with lowercase letter or digit',
          onlyContainsLettersDigitHyphens: 'Only contains letters, digits, hyphens',
          noUppercase: 'No Uppercase',
          noBlankUsername: 'Username cannot be blank',
          noSpaceInUsername: 'No space allowed'
        },
        prefix1: 'Account name should ',
        prefix2: 'Each account segment should ',
        notEmpty: 'not be empty.',
        longer: 'be longer.',
        shorter: 'be shorter.',
        startLetter: 'start with a letter.',
        lettersDigitsDashes: 'have only lowercase letters, digits, or dashes.',
        oneDash: 'have only one dash in a row.',
        endAlphanumeric: 'end with a letter or digit.'
      },
      email: {
        invalid: 'Invalid email address',
        invalidDomain: 'Invalid top level domain name'
      },
      password: {
        requirement: {
          peerplaysLength: 'Password should be at least 22 symbols (alphanumeric)',
          length: 'Should be between 6 & 60 chars long',
          number: 'Contains at least 1 number',
          specialChar: 'Contains a special character from (.@!#$%^*)',
          unallowedSpecialChar: 'No Unallowed special character',
          noSpaces: 'No Spaces'
        },
        confirmPassword: 'Passwords must match'
      },
      search: {
        lengthRequirement: 'search text must be greater than 3 and less than 100 characters',
        noBlank: 'search text cannot be blank'
      },
      date: {
        invalid: 'not a valid date',
        beToday: 'starting date must be current date',
        startLessThanEnd: 'start date must be less than end date'
      },
      profile: {
        invalidImageType: 'Only JPEG and PNG images are supported.',
        invalidImageSize: 'Image must be less than 1 MB.',
        invalidTypeAndSize: 'Image must be JPEG or PNG \nand be less than 1 MB.'
      },
      general: {
        beNumber: 'must be a number',
        beDecimalOrInt: 'must be either a decimal or integer'
      }
    },
    login: {
      header: 'Login',
      welcome: 'Hello, welcome again!',
      enterUsername: 'Enter your PeerID Username or Email',
      enterPassword: 'Enter your PeerID Password',
      dontHaveAccount: 'Don\'t have a PeerID account?',
      register: 'Register',
      forgotPass: 'Forgot your password?',
      orLoginWith: 'or Login using our Sign In Partners',
      invalidPassword: 'The password you\'ve entered is incorrect',
      error: 'Login Error',
      verify: 'Please verify your email'
    },
    guestUser:{
      header: 'Unauthorized Access',
      message: 'You need to login before proceeding further'
    },
    register: {
      createAccount: 'Create an Account',
      createAccountSubHeader: 'Welcome, you will be surprised here!',
      enterEmail: 'Enter your email',
      enterUsername: 'Enter your username',
      enterPassword: 'Enter your password',
      confirmPassword: 'Confirm your password',
      alreadyHaveAccount: 'Already have a PeerID account?',
      login: 'Login',
      passwordStrength: {
        veryWeak: 'Very Weak',
        weak: 'Weak',
        medium: 'Medium',
        strong: 'Strong'
      },
      responses: {
        errorMissing: 'All of the required fields must be filled.',
        confirmSent: 'Confirmation email sent.'
      }
    },
    header: {
      login: 'Log In',
      logout: 'Log Out',
      signup: 'Sign Up',
      menu: 'Menu',
      popular: 'Popular'
    },
    forgotPassword: {
      header: 'Forgot Your Password?',
      subHeader: 'Enter your email to reset your PeerID password.',
      enterEmail: 'Enter your PeerID Email',
      resultText: {
        success:'If an account exists that matches the email provided, an email will be sent to reset your password.',
        cooldown:'You have attempted to reset your password too many times, please wait before trying again.',
        invalidEmail:'Please enter a valid email.'
      },
      resetForm: {
        header: 'Reset your password',
        subHeader: 'Please choose a new password to finish signing in.',
        newPassword: 'Enter your new password',
        confirmPassword: 'Confirm your new password',
        noMatch: 'Passwords do not match.',
        expired: 'The reset link has expired or is no longer valid.',
        passwordStrength: {
          veryWeak: 'Very Weak',
          weak: 'Weak',
          medium: 'Medium',
          strong: 'Strong'
        }
      }
    },
    peerplays: {
      login: 'Login with Peerplays Global',
      enterUsername: 'Enter your username',
      enterPassword: 'Enter your password',
      dontHaveAccount: 'Don\'t have a Peerplays Global account?',
      register: 'Register',
      authenticate: 'Authenticate Your Peerplays Account',
      username: 'Username',
      password: 'Password',
      information: {
        title: 'Information',
        content: 'The username you enter is powered by the Peerplays blockchain. If you already have a username at Peerplays, ' +
        'please enter it here to link your PeerID profile to it. If you don\'t have one, simply proceed to ',
        register: 'register your account'
      },
      passwordLengthError: 'Password should be at least 12 characters long'
    },
    rightMenu: {
      links: {
        account: 'Account',
        developer: 'Developer'
      }
    },
    error: 'Error!',
    copyright: 'Peerplays Global©',
    companyName: 'Peerplays Global',
    companyAddress1: '12 Mount Havelock',
    companyAddress2: 'Douglas, Isle of Man  IM1 2QG',
    dashboard: {
      tableLinks: {
        edit: 'Edit',
        delete: 'Delete',
        revoke: 'Revoke Permission'
      }
    }
  }
};
