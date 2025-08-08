// loadSounds.js

function loadSounds(whichArray)
{
    for (let x = 0; x < whichArray.length; x++)
    {
        let theSound = ce('audio');
        
        if (online == false)
        {
            theSound.src = whichArray[x].soundFileOffline;
        }
        else
        {
            theSound.src = whichArray[x].soundFileOnline;
        }
    
        // we use the name as the id
        theSound.id = whichArray[x].name;
        theSound.loop = false;
        theSound.volume = 1.0;
        ba(theSound);
    }
}

//----//

// Dedicated to God the Father
// All Rights Reserved Christopher Andrew Topalian Copyright 2000-2025
// https://github.com/ChristopherTopalian
// https://github.com/ChristopherAndrewTopalian
// https://sites.google.com/view/CollegeOfScripting

