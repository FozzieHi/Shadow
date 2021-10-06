const messageDelete = require('../src/events/messageDelete.js');
const Message = require('../__mocks__/Message.mock.js');
const db = require('../src/database/index.js');
const JestConfiguration = require('../__config__/JestConfiguration.js');

describe("messageDelete Handler", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("Sends a deleted message without a log channel set", async () => {
        const spy = jest.spyOn(messageDelete, "runEvent");
        const spyDb = jest.spyOn(db.guildRepo, "getGuild");
        const mockMessage = new Message('Hi, this is a test message!');
        mockMessage.guild.id = JestConfiguration.guilds.withoutLogChannel;

        await messageDelete.runEvent(mockMessage);
        expect(spy).toHaveBeenCalled();
        expect(spyDb).toHaveBeenCalledTimes(1);
    });

    // it("Sends a deleted message with a log channel set", async () => {
    //     const spy = jest.spyOn(messageDelete, "runEvent");
    //     const spyDb = jest.spyOn(db.guildRepo, "getGuild");
    //     const mockMessage = new Message('Hi, this is a test message!');
    //     mockMessage.guild.id = JestConfiguration.guilds.withLogChannel;
    //
    //     messageDelete.runEvent(mockMessage);
    //     expect(spy).toHaveBeenCalled();
    //     expect(spyDb).toHaveBeenCalledTimes(1);
    // });
})
