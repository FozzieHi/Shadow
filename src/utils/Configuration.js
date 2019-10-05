class Configuration {
    constructor() {
        this.defaultColours = [ // Lovely hex
            0xff269a,
            0x00ff00,
            0x00e828,
            0x08f8ff,
            0xf226ff,
            0xff1C8e,
            0x68ff22,
            0xffbe11,
            0x2954ff,
            0x9624ed,
            0xa8ed00
        ];

        this.greenColour = 0x00e828;
        this.orangeColour = 0xe8511f;
        this.errorColour = 0xff0000;

        this.emotes = {
            enabled: '<:enabled:481046316370231296>',
            enabledID: '481046316370231296',
            disabled: '<:disabled:481046198548037642>',
            disabledID: '481046198548037642'
        };

        this.regexes = {
            antiad: /(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li)|discordapp\.com\/invite|dicksword\.com\/invite|discordservers\.com\/server)\/.+[a-zA-Z]/g
        }
    }
}

module.exports = new Configuration();
