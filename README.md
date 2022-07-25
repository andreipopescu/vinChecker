# vinChecker

**vinChecker** is a command line tool built with node, which helps gather infomation on a romanian reegistered car, based on the registration number or the VIN. This is the beta version and you are welcome to fork the reepo and improve or add new features.

![Screen-Recording](https://user-images.githubusercontent.com/43548656/180727093-fd109458-2110-48e7-af16-db327336bd09.mov)

## Highlights 
**vinChecker** Beta supports:
- Vehicle data identification based on plate no. or VIN
- National stolen cars database identification
- Vignette identification

## Prerequisites 
**vinChecker** is built with node 16.15.1 and uses `axios` and `minimis`.

## Installing vinChecker
To install **vinChecker** on your machine, run the following commands on your terminal:
```
git clone git@github.com:mihneamanolache/vinChecker.git 
cd vinChecker
npm i
```

## Using vinChecker
In order to run **vinChecker**, navigate to it's directory and run the following command:
`node app.js` followed by **one** of the two required arguments: 
- `--vin=` - seearch by VIN no.
- `--plate=` - search by registration no.
You can also parse the `--vignette` argument to check if the vehicle has a valid vignette.