export default {
  en: {
    global: {
      add: 'add',
      edit: 'edit',
      delete: 'delete'
    },
    resources: {
      players: {
        notification: {
          appendImage: {
            profilePicture: {
              success: 'Appending profile picture successful',
              failure: 'Appending profile picture failed'
            }
          }
        }
      },
      users: {
        actions: {
          addProfilePicture: {
            label: 'Profile picture',
            buttonLabel: 'Add picture'
          },
          sendResetPwd: {
            label: 'Password reset',
            buttonLabel: 'Send password reset email'
          },
          verifySignupShort: {
            label: 'Verify Sign Up with Short',
            buttonLabel: 'Verify with short token'
          },
          verifySignupLong: {
            label: 'Verify Sign Up with Long',
            buttonLabel: 'Verify with long token'
          }
        },
        notification: {
          appendImage: {
            profilePicture: {
              success: 'Appending profile picture successful',
              failure: 'Appending profile picture failed'
            }
          },
          playerAuthManagement: {
            success: {
              playerAuthManagement: 'Auth management action success',
              sendResetPwd: 'Send password rest to %{email}',
              verifySignupShort: 'Verification successful',
              verifySignupLong: 'Verification successful'
            },
            failure: {
              playerAuthManagement: 'Auth management action failure',
              sendResetPwd: 'Failed to send password reset',
              verifySignupShort: 'Verification failed',
              verifySignupLong: 'Verification failed'

            }
          }
        }
      }
    }
  }
}
