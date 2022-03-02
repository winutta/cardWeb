import { SquareText } from "./textClasses.js"

export function setupText() {
    // Make Text Systems and add them to the scene.

    // var tsconfig1 = {
    //     buttonText: "LL",
    //     popoutText: "This is the lower left hand.",
    //     popoutOffset: [2, 1, 1],
    //     position: [-3, 2, 1],
    // }

    // var ts1 = new TextSystem(tsconfig1);

    var config1 = {
        text: "Dear Lauren, \n\n"
        + "You shine brighter than the most sparkly bow. As you face new directions, parts of you light up. Each glimmer represent bright opportunities to enjoy and try out new ways of continuing your journey. Even though they could not be seen before you embraced new paths, they were always there waiting to brighten. And just as the new was hidden but here, what has become less prominent is still there to be discovered again."
        + "\n\nGrowth is evolution. Just as the butterfly has shed its caterpillar form, you evolve to achieve new heights soaring on rising winds. As your wings gain strength you make the journey to new lands, resting on beautiful flowers along the way."
        + "\n\nYou are becoming yourself day after day, venturing out while still cherishing where you have been. In the distance you can see fantastical worlds of avatars and art, as well as leafy gardens bursting with life. They are just beyond the horizon, accompanied by what cannot be foreseen. I am sure it will be amazing and worth the journey. I am wishing you joy today and each day to come, and I am so grateful to be by your side as you live your wondrous life. Spread your wings and fly as you discover new light.\n\nHappy Birthday, Love Will"
        ,
        position: [0,0,0],
    }



    var st1 = new SquareText(config1.text,config1.position);
    console.log(st1);

}