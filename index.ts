import { Message, VoiceConnection } from "discord.js";
import * as Discord from "discord.js";
import { prefix, token, channel, meds } from "./config.json";
import * as ytdl from "ytdl-core";

const client = new Discord.Client();
client.login(token);

let connection: VoiceConnection;

client.once("ready", () => {
    client.user.setPresence({
        activity: {
            name: "discord.gg/xcu8uXk"
        }
    });
    setTimeout(() => {
        client.user.setPresence({
            activity: {
                name: "discord.gg/xcu8uXk"
            }
        });
    }, 60000);
    console.log("Ready.");
});

client.once("disconnect", () => {
    console.log("Disconnected.");
});

client.on("message", async (message: Message) => {
    if (message.author.bot) return;
    if (message.channel.id === "697999380791296050") {
        if (message.content.toLowerCase().includes("clips.twitch.tv")) {
            return;
        } else {
            message.delete();
            message.author.send("Please only post twitch clips in the `twitch-clips` channel 🤡");
            return;
        }
    }
    if (!message.content.startsWith(prefix) && !message.content.startsWith("-"))
        return;
    if (message.content.startsWith(`-wadu`)) message.channel.send("hek!");
    if (!(message.member.voice.channelID == channel)) return;

    if (message.content.startsWith(`${prefix} 10`)) {
        play(10, message);
        return;
    } else if (message.content.startsWith(`${prefix} 20`)) {
        play(20, message);
        return;
    } else if (message.content.startsWith(`${prefix} 30`)) {
        play(30, message);
        return;
    }
});

const play = async (time: number, message: Message) => {
    const voiceChannel = message.member.voice;
    console.log(voiceChannel);
    if (!voiceChannel)
        message.channel.send("You must be in the meditation voice channel.");
    if (connection) {
        message.channel.send("Please wait for the meditation to finish.");
        return;
    }
    if (time === 10) {
        try {
            connection = await voiceChannel.channel.join();
            message.channel.send("Starting 10 minute meditation.");
            const dispatcher = connection
                .play(ytdl(meds[0]))
                .on("finish", () => {
                    connection.channel.leave();
                    connection = undefined;
                });
            dispatcher.setVolumeLogarithmic(0.5);
        } catch (err) {
            console.log(err);
        }
    } else if (time === 20) {
        try {
            connection = await voiceChannel.channel.join();
            message.channel.send("Starting 20 minute meditation.");
            const dispatcher = connection
                .play(ytdl(meds[1]))
                .on("finish", () => {
                    connection.channel.leave();
                    connection = undefined;
                });
            dispatcher.setVolumeLogarithmic(0.5);
        } catch (err) {
            console.log(err);
        }
    } else if (time === 30) {
        try {
            connection = await voiceChannel.channel.join();
            message.channel.send("Starting 30 minute meditation.");
            const dispatcher = connection
                .play(ytdl(meds[2]))
                .on("finish", () => {
                    connection.channel.leave();
                    connection = undefined;
                });
            dispatcher.setVolumeLogarithmic(0.5);
        } catch (err) {
            console.log(err);
        }
    }
};
