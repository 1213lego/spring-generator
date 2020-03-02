export function handleInteractiveMode(args: object) {
    console.log('Interactive mode', args);
    require('./intro').showIntro();
}