export default {
  en: {
    pos: {
      search: 'Search',
      settings: 'Settings',
      language: 'Language',
      theme: {
        name: 'Theme',
        light: 'Light',
        dark: 'Dark'
      },
      dashboard: {
        monthly_revenue: 'Monthly Revenue',
        new_orders: 'New Orders',
        pending_reviews: 'Pending Reviews',
        new_customers: 'New Customers',
        pending_orders: 'Pending Orders',
        order: {
          items:
            'by %{customer_name}, one item |||| by %{customer_name}, %{nb_items} items'
        },
        welcome: {
          title: 'Welcome to react-admin demo',
          subtitle:
            "This is the admin of an imaginary poster shop. Feel free to explore and modify the data - it's local to your computer, and will reset each time you reload.",
          aor_button: 'react-admin site',
          demo_button: 'Source for this demo'
        }
      },
      menu: {
        sales: 'Sales',
        catalog: 'Catalog',
        customers: 'Customers'
      }
    },
    global: {
      add: 'add',
      edit: 'edit',
      delete: 'delete'
    },
    resources: {
      players: {
        notification: {
          removeAccount: 'Account deleted',
          saveChanges: {
            success: 'Saving changes successful',
            failure: 'Saving changes failed'
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
