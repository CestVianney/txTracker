chrome.action.onClicked.addListener((tab) => {
  chrome.windows.create({
    url: "popup.html", // Fichier HTML à afficher dans la fenêtre.
    type: "popup",
    width: 750,       // Largeur de la fenêtre.
    height: 400,      // Hauteur de la fenêtre.
    focused: true    // La fenêtre sera immédiatement focus.
  });
});
