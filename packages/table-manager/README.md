# Table Manager STF

## Requires:

### Hardware:

- [Raspberry Pi](https://www.raspberrypi.org/)
- [Camera](https://www.raspberrypi.org/products/camera-module-v2/?resellerType=home) (You can use every camera compatible with Raspberry Pi)
- [Gate sensor](https://botland.com.pl/pl/czujniki-ruchu/3078-czujnik-przerwania-wiazki-ir-led-5mm.html?gclid=CjwKCAiAkan9BRAqEiwAP9X6UQG3aO2cFnJKK-csWC2BhK16cDcUppkIL2QR9XoCT1pKuaZRmUSOuRoCckIQAvD_BwE) (It can be every sensor that can be recognized as a input)
- Wires

#### Optional

- [LED Lights](https://www.amazon.com/s?k=LED+Light+Emitting+Diodes&ref=nb_sb_noss_2) (5 Diodes in 4 different colors)

### Software:

- [NodeJS](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/)
- [MP4Box](https://www.raspberrypi.org/documentation/usage/camera/raspicam/raspivid.md)

## Getting Started

### Prepare hardware

#### Connect and setup camera

Firstly connect your camera with USB or through native camera module.

Then execute the following instructions on the command line to download and install the latest kernel, GPU firmware, and applications.
You'll need an internet connection for this to work correctly.

```shell script
sudo apt update
sudo apt full-upgrade
```

Now you need to enable camera support using the `raspi-config` program you will have used when you first set up your Raspberry Pi.

```shell script
sudo raspi-config
```

Use the cursor keys to select and open Interfacing Options, and then select Camera and follow the prompt to enable the camera.

Upon exiting `raspi-config`, it will ask to reboot.
The enable option will ensure that on reboot the correct GPU firmware will be running with the camera driver and tuning,
and the GPU memory split is sufficient to allow the camera to acquire enough memory to run correctly.

To test that the system is installed and working, try the following command:

```shell script
raspistill -v -o test.jpg
```

It should take the photo and save in your home directory under test.jpg

#### Connect LED lights and gate sensors

> _Note:_ [GPIO for Raspberry Pi 4](https://www.raspberrypi.org/documentation/usage/gpio/). It may differ on other devices.

| Name                | GPIO | Direction | Required | Recommended LED color |
| ------------------- | ---- | --------- | -------- | --------------------- |
| TABLE_MANAGER_LIGHT | 23   | out       |          | ⚪                    |
| GATE_A_LIGHT        | 21   | out       |          | 🔴                    |
| GATE_B_LIGHT        | 25   | out       |          | 🔴                    |
| MATCH_LIGHT         | 15   | out       |          | 🟡                    |
| TABLE_LIGHT         | 13   | out       |          | 🟢                    |
| GATE_A_SENSOR       | 2    | in        | ❗️      | -                     |
| GATE_B_SENSOR       | 14   | in        | ❗ ️     | -                     |

#### \*Custom GPIO

For custom pins go to [Table manager GPIO configuration](./src/GPIO.js) and [Table GPIO configuration](../table/src/GPIO.js)
and set manually all GPIO.

### Yarn

```shell script
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
  echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
```

```shell script
sudo apt update && sudo apt install --no-install-recommends yarn
```

```shell script
yarn -v
```

### NVM

To install nvm run the following curl command which will download and run the nvm installation script:

```shell script
$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
```

Close and reopen your terminal to start using nvm or run the following to use it now

```shell script
$ export NVM_DIR="$HOME/.nvm"
 [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
 [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
```

To ensure that nvm is properly installed type:

```shell script
$ nvm -v
```

Install required node version

```shell script
$ nvm install 12
```

### Runs Table Manger on Raspberry Boot with [crontab](https://www.raspberrypi.org/documentation/linux/usage/cron.md)

In raspberry console type `crontab` with `-e` flag to edit crontab configuration file

```shell script
crontab -e
```

On the end of the file (after comments), add this line:

> If you want your command to be run in the background while the Raspberry Pi continues starting up,
> add a space and `&` at the end of the line

```
@reboot cd /home/pi/smart-table-football/packages/table-manager && yarn start &
```

After previous step table manager will be launched in background on every raspberry reboot.
