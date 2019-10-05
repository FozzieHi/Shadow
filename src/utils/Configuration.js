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

        this.errorColour = 0xff0000;

        this.regexes = {
            antiad: /(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li)|discordapp\.com\/invite|dicksword\.com\/invite|discordservers\.com\/server)\/.+[a-zA-Z]/g
        }
    }
}

module.exports = new Configuration();
