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
        this.redColour = 0xea0c00;
        this.orangeColour = 0xe8511f;
        this.lightOrangeColour = 0xff720e;
        this.errorColour = 0xff0000;

        this.intents = [
            'GUILDS',
            'GUILD_MEMBERS',
            'GUILD_MESSAGES',
            'GUILD_MESSAGE_REACTIONS',
            'DIRECT_MESSAGES'
        ];

        this.game = {
            activity: ['github.com/FozzieHi/Shadow', 'shdw.cc'],
            type: 'WATCHING'
        };

        this.emotes = {
            enabled: '<:enabled:481046316370231296>',
            enabledID: '481046316370231296',
            disabled: '<:disabled:481046198548037642>',
            disabledID: '481046198548037642'
        };

        this.intervals = {
            changeStatus: 15000,
            autoUnmute: 25000,
            autoUnban: 25000,
            checkBot: 300000
        };

        this.regexes = {
            antiad: /(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li)|discord\.com\/invite|discordapp\.com\/invite|dicksword\.com\/invite|discordservers\.com\/server|top\.gg\/server|shdw\.cc\/i)\/.+[a-zA-Z0-9]/,
            invite: /^[a-zA-Z]{8}$/
        };


        this.invites = {
            bot: 'https://shdw.cc'
        };
    }
}

module.exports = new Configuration();
