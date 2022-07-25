const axios = require("axios")
const args = require('minimist')(process.argv.slice(2))

const COLORS = {
    'red':'\x1b[31m%s\x1b[0m',
    'green':'\x1b[32m%s\x1b[0m',
    'yellow':'\x1b[33m%s\x1b[0m',
    'blue':'\x1b[34m%s\x1b[0m',
    'cyan':'\x1b[36m%s\x1b[0m',
    'magenta':'\x1b[35m%s\x1b[0m'
    
}

const getVignette = async (vin) => {
    console.log(COLORS.yellow ,`\n[i] Checking vignette for ${vin}`)
    try {
        let response = await axios.get(`https://www.erovinieta.ro/vgncheck/api/findVignettes\?plateNumber\=B100ABC\&vin\=${vin}\&cacheBuster\=1655203595103`)
        if ( response.data.length != 0 ) {
            console.log(COLORS.cyan, `[+] Vehicle ${vin} identified!`)
            console.log(COLORS.magenta, `   [+] Registration number: ${response.data[0].nrAuto}`)
            console.log(COLORS.magenta, `   [+] VIN number: ${response.data[0].serieSasiu}`)
            console.log(COLORS.cyan, `   [+] Vignette valid until: ${response.data[0].dataStop}\n`)
        } else {
            console.log(COLORS.red, '   [-] Vehicle does not appear to have a valid Romanian Vignette.')
        }
    } catch(e) {
        console.log(COLORS.red, '[!] ERROR: Sorry, there was an error!')
    }
}

const getAllianz = async (plate=null, vin=null) => {
    const BASE_URL_ALLIANZ = `https://mobil.allianztiriac.ro/api/myCar/`
    const PLATE_ENDPOINT_ALLIANZ = `vin\?licensePlateNumber\=${plate}\&requestId\=62cfc78c2d4368230086028`
    if ( plate != null ) {
        console.log(COLORS.yellow ,`\n[i] Attenpting to ideentify data based on plante no.: ${plate}`)
        try {
            let response = await axios.get(BASE_URL_ALLIANZ + PLATE_ENDPOINT_ALLIANZ)
            console.log(response.data)
        } catch (e) {
            console.log(COLORS.red, '[-] Unable to retrieve data from Allianz!')
        }
    }
    if ( vin != null ) {
        console.log(COLORS.yellow ,`\n[i] Attenpting to identify data based on VIN no.: ${vin}`)
        try {
            let response = await axios.get(`https://mobil.allianztiriac.ro/api/myCar/vin\?vin\=${vin}\&requestId\=62cfc78c2d4368230086028e`)
            console.log(COLORS.cyan, `[+] Vehicle ${vin} identified!`)
            console.log(COLORS.magenta, `   [+] VIN: ${response.data.vehicleIdentificationNumber}`)
            console.log(COLORS.magenta, `   [+] Registration number: ${response.data.vehiclePlateNo}`)
            console.log(COLORS.magenta, `   [+] Brand: ${response.data.vehicleBrandName}`)
            console.log(COLORS.magenta, `   [+] Type: ${response.data.vehicleType}`)
            console.log(COLORS.magenta, `   [+] Model: ${response.data.vehicleModel}`)
            console.log(COLORS.magenta, `   [+] Year: ${response.data.vehicleYear}`)
            console.log(COLORS.magenta, `   [+] Energy Source: ${response.data.vehicleEnergySource}`)
            console.log(COLORS.magenta, `   [+] CC: ${response.data.vehicleCubicCapacity}`)
            console.log(COLORS.magenta, `   [+] HP: ${response.data.vehicleEnginePower}`)
        } catch (e) {
            console.log(COLORS.red, '[-] Unable to retrieve data from Allianz!')
        }
    }
}

const getStolen = async (vin) => {
    console.log(COLORS.yellow ,`\n[i] Checking if stolen vehicle.`)
    try {
        let response = await axios.get(`https://www.politiaromana.ro/ro/auto-furate?marca=&serie=${vin}&categorie=`)
        if ( response.data.includes('Nu există rezultate!') ) {
            console.log(COLORS.cyan, `  [+] Vehicle ${vin} does not apear to be stolen from Romania!`)
        } else {
            console.log(COLORS.red, '   [-] ATTENTION!!! Vehicle listed as STOLEN by romanian authorities!')
        }
    } catch(e) {
        console.log(COLORS.red, '[!] ERROR: Sorry, there was an error checking romanian stolen cars DB!')
    }
}


const run = async () => {
    if ( args['vin'] ) {
        await getAllianz( plate=null, vin=args['vin' ])
        await getStolen( args['vin'] )
    } else if ( args['plate'] ) {
        await getAllianz(plate=args.plate, vin=null)
    } else {
        console.log(COLORS.red, '[!] ERROR! Please provide plate number or VIN!')
    }

    if ( args['vignette'] ) {
        if ( args['vin'] ) {
            await getVignette(args['vin'])
        } else {
            console.log(COLORS.red, '[!] ERROR! Please provide VIN number!')
        }
    }
}


run()