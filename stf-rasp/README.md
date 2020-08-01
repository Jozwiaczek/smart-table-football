# stf-rasp

## Requires:
 - Node 14.0.0
 - Yarn
 - MP4Box
 

## Installing
### Yarn
``` shell script
$ curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
  echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
```

``` shell script
sudo apt update && sudo apt install --no-install-recommends yarn
```

``` shell script
yarn -v
```

### NVM
To install nvm run the following curl command which will download and run the nvm installation script:
``` shell script
$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
```

Close and reopen your terminal to start using nvm or run the following to use it now
``` shell script
$ export NVM_DIR="$HOME/.nvm"
 [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
 [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
```

To ensure that nvm is properly installed type:
``` shell script
$ nvm -v
```

Install required node version
``` shell script
$ nvm install 14
```


###

 - Install MP4Box `sudo apt install -y gpac` 
 - `yarn` in root project
 - `yarn` in stf-rasp directory
 - `yarn dev` in stf-rasp directory to start
