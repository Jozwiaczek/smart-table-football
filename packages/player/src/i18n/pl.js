import polishMessages from 'ra-language-polish';

export default {
  ra: {
    ...polishMessages.ra,
    action: {
      ...polishMessages.ra.action,
      unselect: 'Odznacz',
    },
  },
  layout: {
    appBar: {
      notifications: {
        title: 'Powiadomienia',
        navigateToPanel: 'Panel powiadomień',
        emptyList: 'Nie masz nowych powiadomień',
      },
      tableStatus: {
        connected: 'Stół jest połączony',
        disconnected: 'Stół jest rozłączony',
        busy: 'Obecnie trwa rozgrywka',
        ready: 'Gotowy do gry!',
        join: {
          tooltip: 'Przycisnij by dołączyć do obecnego meczu',
          button: 'Dołącz',
        },
      },
    },
    userMenu: {
      profile: 'Profil',
      settings: 'Ustawienia',
    },
  },
  models: {
    players: {
      profile: {
        title: 'Profil',
        general: 'Ogólne',
        account: 'Konto',
        actions: 'Akcje',
      },
      avatar: {
        upload: 'Prześlij Avatar',
        confirm: 'Potwierdź Avatar',
        remove: 'Usuń Avatar',
      },
    },
  },
  pos: {
    search: 'Wyszukiwanie',
    settings: 'Ustawienia',
    language: 'Język',
    theme: {
      name: 'Motyw',
      light: 'Jasny',
      dark: 'Ciemny',
    },
    auth: {
      login: {
        sign_up: 'Zarejestruj',
        forgetPassword: 'Zapomniałem swojego hasła',
      },
      registration: {
        sign_up: 'Zarejestruj',
        i_have_an_account: 'Mam już konto',
      },
    },
    dashboard: {
      title: 'Pulpit',
      welcomeTitle: 'Witaj',
      welcomeCard: {
        title: 'Witaj w Smart Table Football!',
        subtitle1:
          'Poniżej znjadziesz twój pulpit ze wszystkimi statystykami z gier, drużym i wszystkimi liczbami.',
        subtitle2:
          'Dla lepszych doswiadczen możesz dodać aplikacje STF do twojego ekranu głównego (IOS, Android, Web).',
        button: 'Ukryj',
      },
      newMatchSection: {
        title: 'Nowa gra?',
        description: 'Jesli chcesz rozpoczac nową gre, kliknij przycisk poniżej',
        button: 'Przygotuj mecz',
      },
      teamsSection: {
        title: 'Zespoły',
        button: 'Zapros znajomego',
      },
      statisticSection: {
        title: 'Statystyki',
        items: {
          longestWinStreak: 'Najdłuższa seria wygranych',
          numberOfGoals: 'Liczba goli',
          winRatio: 'Współczynnik wygranych',
          matchesInWeek: 'Liczba meczy w ostatnim tygodniu',
        },
      },
      lastMatchSection: {
        title: 'Ostatnia gra',
        body: 'Kliknij przycisk poniżej aby przejsć do statystyk ostatniego meczu',
        button: 'Pokaż',
        empty: 'Nie masz żadnch rozegranych meczy',
      },
    },
    menu: {
      dashboard: 'Pulpit',
      profile: 'Profil',
      teams: 'Zespoły',
      matches: 'Rozgrywki',
    },
  },
  global: {
    add: 'Dodaj',
    edit: 'Edytuj',
    delete: 'Usuń',
    saveChanges: 'Zapisz zmiany',
  },
  resources: {
    players: {
      actions: {
        sendResetPwd: {
          label: 'Resetowanie hasła',
          buttonLabel: 'Wyslji email resetujący hasło',
        },
        verifySignupShort: {
          label: 'Verify Sign Up with Short',
          buttonLabel: 'Verify with short token',
        },
        verifySignupLong: {
          label: 'Verify Sign Up with Long',
          buttonLabel: 'Verify with long token',
        },
      },
      notification: {
        removeAccount: 'Konto usuniete',
        saveChanges: {
          success: 'Poprawnie zapisano zmiany',
          failure: 'Błąd w zapisywaniu zmian',
        },
        playerAuthManagement: {
          success: {
            playerAuthManagement: 'Sukces akcji autoryzującej',
            sendResetPwd: 'Mail resetujący wysłany do %{email}',
            verifySignupShort: 'Weryfikacja poprawna',
            verifySignupLong: 'Weryfikacja poprawna',
          },
          failure: {
            playerAuthManagement: 'Błąd akcji autoryzującej',
            sendResetPwd: 'Bład wysyłania maila restującego',
            verifySignupShort: 'Błąd weryfikacji',
            verifySignupLong: 'Błąd weryfikacji',
          },
        },
      },
    },
  },
};
