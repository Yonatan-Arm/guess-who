'use strict';

// NOTE: This is a global used only in the controller
var gLastRes = null;

$(document).ready(init);
$('.btn-start').click(onStartGuessing);
$('.btn-yes').click({ ans: 'yes' }, onUserResponse);
$('.btn-no').click({ ans: 'no' }, onUserResponse);
$('.btn-add-guess').click(onAddGuess);

function init() {
  console.log('Started...');
  createQuestsTree();
}

function onStartGuessing() {
  // TODO: hide the game-start section
  $('.game-start').hide('slow')
  renderQuest();
  // TODO: show the quest section
  $('.quest').show('slow')

}

function renderQuest() {                            
  // TODO: select the <h2> inside quest and update
  $('h2').show('slow')
  // its text by the currQuest text
  var quest=getCurrQuest()
    $('.quest h2').text(quest.txt)

}

function onUserResponse(ev) {
  var res = ev.data.ans;
  // If this node has no children
  if (isChildless(getCurrQuest())) {
    if (res === 'yes') {
      alert('Yes, I knew it!');
      $('.quest').hide()   
      onRestartGame()
       // TODO: improve UX
    } else {
      alert('I dont know...teach me!');
      // TODO: hide and show new-quest section
      $('h2').hide('slow')
      $('.quest').hide('slow')
      $('.new-quest').show('slow')
    }
  } else {
    // TODO: update the lastRes global var
    gLastRes= res
    moveToNextQuest(gLastRes);
    renderQuest();
  }
}

function onAddGuess(ev) {
  ev.preventDefault();
  var newGuess = $('#newGuess').val();
  var newQuest = $('#newQuest').val();
  addGuess(newQuest,newGuess,gLastRes)
  // TODO: Get the inputs' values
  // TODO: Call the service addGuess

  onRestartGame();
}

function onRestartGame() {
  $('.new-quest').hide();
  $('.game-start').show('slow');
  $('h2').text('Think of Someone...')
  gLastRes = null;
  init()
}
