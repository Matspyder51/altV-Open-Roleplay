import * as alt from 'alt';
import * as chat from '../chat/chat.mjs';
import * as configurationItems from '../configuration/items.mjs';

console.log('Loaded: commands->sandbox.mjs');

const sandboxhelp = [
    //
    '/b, /me, /do',
    '/addveh (model)',
    '/addcash (amount)',
    '/wep (hash)',
    '/face',
    '/granola, /coffee',
    '/tpto (rp-name)',
    '/players, /clearchat',
    '/taxi, /taxicancel',
    '/mechanic, /mechaniccancel',
    'Z + Right-Click to Interact',
    'I for Inventory'
];

chat.registerCmd('help', player => {
    sandboxhelp.forEach(helper => {
        player.send(`${helper}`);
    });
});

chat.registerCmd('addcash', (player, value) => {
    let data = value * 1;
    if (value > 600000) return;
    player.addCash(data);
}, 'admin');

chat.registerCmd('wep', (player, hash) => {
    if (hash === undefined) {
        player.send(`Hash; such as: -270015777`);
        return;
    }
    let weapon = hash[0];
    if (parseInt(weapon) == NaN)
        weapon = alt.hash(weapon);

    player.giveWeapon(weapon, 9999, true);
}, 'admin');

chat.registerCmd('face', player => {
    player.showFaceCustomizerDialogue(player.pos);
}, 'admin');

chat.registerCmd('granola', player => {
    let itemTemplate = configurationItems.Items['GranolaBar'];
    player.addItem(itemTemplate, 5);
}, 'admin');

chat.registerCmd('coffee', player => {
    let itemTemplate = configurationItems.Items['Coffee'];
    player.addItem(itemTemplate, 5);
}, 'admin');

chat.registerCmd('additem', (player, arg) => {
    let itemTemplate = configurationItems.Items[`${arg[0]}`];
    if (itemTemplate === undefined) {
        player.send('Item does not exist');
        return;
    }
    player.addItem(itemTemplate, 1);
}, 'admin');

chat.registerCmd('addveh', (player, arg) => {
    try {
        player.addVehicle(arg[0], player.pos, new alt.Vector3(0, 0, 0));
    } catch (e) {
        player.send('Not a valid vehicle model. Must be a plain name. ie. infernus');
    }
});

chat.registerCmd('coord', (player, args) => {
    if (args.length <= 2) {
        player.send('/coord (x, y, z)');
        return;
    }

    player.pos = {
        x: args[0],
        y: args[1],
        z: args[2]
    };
});

chat.registerCmd('tpto', (player, arg) => {
    if (arg === undefined) {
        player.send('/tpto (roleplay_name)');
        return;
    }

    let target = alt.Player.all.find(x => x.data.name.includes(arg[0]));

    if (target === undefined) {
        player.send('User was not found.');
        return;
    }

    player.pos = target.pos;
}, 'helper');

chat.registerCmd('players', player => {
    alt.Player.all.forEach(t => {
        player.send(`${t.data.name}`);
    });
});
