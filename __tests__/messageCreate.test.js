const messageCreate = require('../src/events/messageCreate.js');
const Message = require('../__mocks__/Message.mock.js');

describe("messageCreate Handler", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("Sends an unknown command message", async () => {
        const spy = jest.spyOn(messageCreate, "runEvent");
        const mockMessage = new Message('$unknowncmd');

        const runEvent = await messageCreate.runEvent(mockMessage);
        expect(spy).toHaveBeenCalled();
        expect(runEvent).toBeUndefined();
    })
})
