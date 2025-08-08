// makeInterface.js

function makeInterface()
{
    // we add a background image
    let backgroundImg = ce('img');
    backgroundImg.id = 'background';
    backgroundImg.src = 'src/media/textures/bg/city/003.webp';
    backgroundImg.alt = 'Background';
    backgroundImg.style.position = 'absolute';
    backgroundImg.style.top = '0px';
    backgroundImg.style.left = '0px';
    backgroundImg.style.width = '100vw';
    backgroundImg.style.height = '100vh';
    ba(backgroundImg);

    //-//

    // we make a container to hold the bg interface elements
    let bgGUIContainer = ce('div');
    bgGUIContainer.style.position = 'absolute';
    bgGUIContainer.style.left = '5px';
    bgGUIContainer.style.top = '4px';
    bgGUIContainer.style.display = 'flex';
    bgGUIContainer.style.flexDirection = 'row';
    bgGUIContainer.style.gap = '2px';
    bgGUIContainer.style.zIndex = 2;
    ba(bgGUIContainer);

    //-//

    // we make a BG button that will create an input when pressed
    let chooseBGBtn = ce('button');
    chooseBGBtn.id = 'chooseBackground';
    chooseBGBtn.textContent = 'BG';
    chooseBGBtn.onclick = function()
    {
        clickSound();

        // we make an input element for choosing the file
        let input = ce('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = function(event)
        {
            ge('sfx_warp_001').play();

            let file = event.target.files[0];

            if (file)
            {
                let reader = new FileReader();

                reader.onload = function(event)
                {
                    ge('background').src = event.target.result;

                    // clear the videoBackground if it is already set
                    ge('videoBackground').src = '';
                };
                reader.readAsDataURL(file);
            }
        };
        input.click();
    };
    bgGUIContainer.append(chooseBGBtn);

    //-//

    // we make a drop zone for the BG
    let dropZoneBG = ce('div');
    dropZoneBG.ondrop = function(event)
    {
        clickSound();

        event.preventDefault();

        let file = event.dataTransfer.files[0];

        if (file)
        {
            let reader = new FileReader();

            reader.onload = function(event)
            {
                ge('sfx_warp_001').play();
    
                ge('background').src = event.target.result;

                // clear the videoBackground if it is already set
                ge('videoBackground').src = '';
            };
            reader.readAsDataURL(file);
        }
    };
    dropZoneBG.ondragover = function(event)
    {
        event.preventDefault();
    };
    dropZoneBG.className = 'dropZone';
    bgGUIContainer.append(dropZoneBG);

    //-//

    // we make a container to hold the character interface elements
    let characterGUIContainer = ce('div');
    characterGUIContainer.style.position = 'absolute';
    characterGUIContainer.style.right = '5px';
    characterGUIContainer.style.top = '4px';
    characterGUIContainer.style.display = 'flex';
    characterGUIContainer.style.flexDirection = 'row';
    characterGUIContainer.style.gap = '2px';
    characterGUIContainer.style.zIndex = 2;
    ba(characterGUIContainer);

    //-//

    // we make a character button to create a file input when clicked
    let characterBtn = ce('button');
    characterBtn.id = 'chooseCharacter';
    characterBtn.textContent = 'Character';
    characterBtn.style.zIndex = '2';
    characterBtn.onclick = function()
    {
        clickSound();
    
        // we create the file input
        let input = ce('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.addEventListener('change', function(event)
        {
            ge('sfx_warp_001').play();

            let file = event.target.files[0];

            if (file)
            {
                characterCounter += 1;

                let character = ce('img');
                character.id = 'character' + characterCounter;
                character.src = URL.createObjectURL(file);
                character.style.borderRadius = borderStyle;
                character.style.position = 'absolute';
                character.style.width = '180px';
                character.style.cursor = 'pointer';
                character.oncontextmenu = function()
                {
                    ge('sfx_blip_001').play();

                    cl(character.id);

                    actor = character.id;
                };
                ba(character);

                //-//

                makeElementDraggable(character);

                //-//

                characters.push(character);
                cl(characters);
            }
        });
        input.click();
    };
    characterGUIContainer.append(characterBtn);

    //-//

    let dropZoneCharacter = ce('div');
    dropZoneCharacter.ondrop = function(event)
    {
        clickSound();

        event.preventDefault();

        let file = event.dataTransfer.files[0];

        if (file)
        {
            characterCounter += 1;

            // we make the character
            let character = ce('img');
            character.id = 'character' + characterCounter;
            character.src = URL.createObjectURL(file);
            character.style.borderRadius = borderStyle;
            character.style.position = 'absolute';
            character.style.width = '180px';
            character.style.cursor = 'pointer';
            character.oncontextmenu = function()
            {
                ge('sfx_blip_001').play();
    
                cl(character.id);

                actor = character.id;
            };
            ba(character);

            //-//

            makeElementDraggable(character);

            //-//

            characters.push(character);

            cl(characters);
        }
    };
    dropZoneCharacter.ondragover = function(event)
    {
        event.preventDefault();
    };
    dropZoneCharacter.className = 'dropZone';
    characterGUIContainer.append(dropZoneCharacter);

    //-//

    // create video element
    let videoElement = ce('video');
    videoElement.id = 'videoBackground';
    videoElement.style.position = 'absolute';
    videoElement.style.left = '0px';
    videoElement.style.top = '0px';
    videoElement.style.minWidth = '100%';
    videoElement.style.minHeight = '100%';
    videoElement.controls = false;
    videoElement.loop = true;
    videoElement.muted = true;
    ba(videoElement);

    //-//

    // we make a container to hold the video interface elements
    let videoGUIContainer = ce('div');
    videoGUIContainer.style.position = 'absolute';
    videoGUIContainer.style.left = '5px';
    videoGUIContainer.style.bottom = '4px';
    videoGUIContainer.style.display = 'flex';
    videoGUIContainer.style.flexDirection = 'row';
    videoGUIContainer.style.gap = '2px';
    ba(videoGUIContainer);

    //-//

    let chooseMovieBtn = ce('button');
    chooseMovieBtn.id = 'chooseMovieBtn';
    chooseMovieBtn.className = 'buttonStyle001';
    chooseMovieBtn.textContent = 'VID';
    chooseMovieBtn.onclick = function()
    {
        clickSound();

        let input = ce('input');
        input.type = 'file';
        input.accept = 'video/*';
        input.onchange = function(event)
        {
            ge('sfx_warp_001').play();

            let file = event.target.files[0];
            if (file)
            {
                let videoElement = ge('videoBackground');

                videoElement.src = URL.createObjectURL(file);

                videoElement.play();
            }
        };
        input.click();
    };
    videoGUIContainer.append(chooseMovieBtn);

    //-//

    let dropZoneVidBG = ce('div');
    dropZoneVidBG.ondrop = function(event)
    {
        clickSound();

        event.preventDefault();

        let file = event.dataTransfer.files[0];

        if (file)
        {
            let videoElement = ge('videoBackground');

            videoElement.src = URL.createObjectURL(file);

            videoElement.play();
        }
    }
    dropZoneVidBG.ondragover = function(event)
    {
        event.preventDefault();
    };
    dropZoneVidBG.textContent = '';
    dropZoneVidBG.className = 'dropZone';
    videoGUIContainer.append(dropZoneVidBG);

    //-//

    let removeButton = ce('button');
    removeButton.style.position = 'absolute';
    removeButton.style.right = 4 + 'px';
    removeButton.style.bottom = 150 + 'px';
    removeButton.style.zIndex = 1000;
    removeButton.textContent = 'E';
    removeButton.onclick = function()
    {
        clickSound();

        if (ge(actor))
        {
            ge(actor).remove();
        }
    };
    ba(removeButton);

    //-// 

    // we make radio buttons for user preference of square or round border for created characters

    // we make a container for the radio buttons
    let radioButtonContainer = ce('div');
    radioButtonContainer.style.zIndex = 100;
    radioButtonContainer.style.position = 'absolute';
    radioButtonContainer.style.right = 4 + 'px';
    radioButtonContainer.style.top = 30 + 'px';
    radioButtonContainer.style.color = 'rgb(100, 100, 100)';
    ba(radioButtonContainer);

    //-//

    // we make a label
    let labelTextRound = ce('div');
    labelTextRound.textContent = 'Rd';
    labelTextRound.title = 'Round';
    radioButtonContainer.append(labelTextRound);

    //-//

    let radioRound = ce('input');
    radioRound.type = 'radio';
    radioRound.name = 'borderChoice';
    radioRound.value = '50%';
    radioRound.addEventListener('change', function()
    {
        clickSound();

        if (radioRound.checked)
        {
            // borderStyle is a worldVariable that we change
            borderStyle = radioRound.value;
        }
    });
    radioButtonContainer.append(radioRound);

    //-//

    let labelTextSquare = ce('div');
    labelTextSquare.textContent = 'Sq';
    labelTextSquare.title = 'Square';
    radioButtonContainer.append(labelTextSquare);

    //-//

    let radioSquare = ce('input');
    radioSquare.type = 'radio';
    radioSquare.name = 'borderChoice';
    radioSquare.value = '0%';
    radioSquare.checked = true;
    radioSquare.addEventListener('change', function()
    {
        clickSound();

        if (radioSquare.checked)
        {
            // borderStyle is a worldVariable that we change
            borderStyle = radioSquare.value;
        }
    });
    radioButtonContainer.append(radioSquare);

    //-//

    // we make a container to hold the size slider
    let sliderContainer = ce('div');
    sliderContainer.style.zIndex = 100;
    sliderContainer.style.position = 'absolute';
    sliderContainer.style.left = '200px';
    sliderContainer.style.top = '4px';
    ba(sliderContainer);

    //-//

    let sizeSlider = ce('input');
    sizeSlider.type = 'range';
    sizeSlider.min = '10';
    sizeSlider.max = '500';
    sizeSlider.value = 180;
    sizeSlider.style.width = '400px';
    sizeSlider.style.position = 'absolute';
    sizeSlider.oninput = function()
    {
        ge(actor).style.width = sizeSlider.value + 'px';
    };
    sliderContainer.append(sizeSlider);
}

//----//

// Dedicated to God the Father
// All Rights Reserved Christopher Andrew Topalian Copyright 2000-2025
// https://github.com/ChristopherTopalian
// https://github.com/ChristopherAndrewTopalian
// https://sites.google.com/view/CollegeOfScripting

