const BaseRepository = require('./BaseRepository.js');
const GuildQuery = require('../queries/GuildQuery.js');
const Guild = require('../models/Guild.js');

class GuildRepository extends BaseRepository {
    anyGuild(guildId) {
        return this.any(new GuildQuery(guildId));
    }

    async getGuild(guildId) {
        const query = new GuildQuery(guildId);
        const fetchedGuild = await this.findOne(query);

        return fetchedGuild !== null ? fetchedGuild : this.findOneAndReplace(query, new Guild(guildId));
    }

    updateGuild(guildId, update) {
        return this.updateOne(new GuildQuery(guildId), update);
    }

    findGuildAndUpdate(guildId, update) {
        return this.findOneAndUpdate(new GuildQuery(guildId), update);
    }

    async upsertGuild(guildId, update) {
        if (await this.anyGuild(guildId)) {
            return this.updateGuild(guildId, update);
        }

        return this.updateOne(new Guild(guildId), update, true);
    }

    async findGuildAndUpsert(guildId, update) {
        if (await this.anyGuild(guildId)) {
            return this.findGuildAndUpdate(guildId, update);
        }

        return this.findOneAndUpdate(new Guild(guildId), update, true);
    }

    deleteGuilds(guildId) {
        return this.deleteMany({ guildId: guildId });
    }
}

module.exports = GuildRepository;
