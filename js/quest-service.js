var gQuestsTree;
var gCurrQuest;
var gPrevQuest = null;
const STORAGE_KEY = "QuestDB";

function createQuestsTree() {
  gQuestsTree = loadFromStorage(STORAGE_KEY);
  if (!gQuestsTree) {
    gQuestsTree = createQuest("Male?");
    gQuestsTree.yes = createQuest("Gandhi");
    gQuestsTree.no = createQuest("Rita");
  }

  gCurrQuest = gQuestsTree;
  gPrevQuest = null;
}

function createQuest(txt) {
  return {
    txt: txt,
    yes: null,
    no: null,
  };
}

function isChildless(node) {
  return node.yes === null || node.no === null;
}

function moveToNextQuest(res) {
  // TODO: update the gPrevQuest, gCurrQuest global vars
  gPrevQuest = gCurrQuest;
  gCurrQuest = gPrevQuest[res];
}

function addGuess(newQuestTxt, newGuessTxt, lastRes) {
  
  gPrevQuest[lastRes] = createQuest(newQuestTxt);
  gPrevQuest[lastRes].yes = createQuest(newGuessTxt);
  gPrevQuest[lastRes].no = gCurrQuest

  _saveToStorage(STORAGE_KEY, gQuestsTree);
}

function getCurrQuest() {
  return gCurrQuest;
}

function _saveToStorage(STORAGE_KEY, gQuestsTree) {
  saveToStorage(STORAGE_KEY, gQuestsTree);
}
