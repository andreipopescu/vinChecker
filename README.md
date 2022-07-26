# vinChecker

**vinChecker** is a command line tool built with node, designed to gather infomation on a Romanian registered cars, based on their registration number or the VIN. This is the beta version and you are welcome to fork the repo and improve or add new features.

![Screen Recording 2022-07-25 at 11 23 27](https://user-images.githubusercontent.com/43548656/180732592-e6e99722-43d5-4134-83dc-78f8627deabb.gif)

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
- `--vin=` - sarch by VIN no.
![VIN CHECK](https://user-images.githubusercontent.com/43548656/180733298-4e75c305-1140-43e6-ae5c-bcc413957655.png)

- `--plate=` - search by registration no.
![PLATE CHECK](https://user-images.githubusercontent.com/43548656/180734297-2001591c-f304-4ee2-9599-bcc513f369b0.png)

You can also parse the `--vignette` argument to check if the vehicle has a valid vignette.