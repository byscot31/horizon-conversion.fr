#target photoshop
app.displayDialogs = DialogModes.NO;

if (!app.documents.length) {
    alert("Ouvre ton PSD template avant de lancer le script.");
    throw new Error("No document");
}

var doc = app.activeDocument;

// Choix du dossier de sortie
var outFolder = Folder.selectDialog("Choisis le dossier d'export");
if (!outFolder) throw new Error("No output folder");

// Qualité JPG
var jpgOpt = new JPEGSaveOptions();
jpgOpt.quality = 10;

// Vérif datasets
if (!doc.dataSets || doc.dataSets.length === 0) {
    alert("Aucun ensemble de données trouvé (Data Sets).");
    throw new Error("No datasets");
}

// Export
for (var i = 0; i < doc.dataSets.length; i++) {
    var ds = doc.dataSets[i];
    ds.apply();

    // Nom de fichier = nom du dataset (sinon fallback)
    var name = (ds.name && ds.name.length) ? ds.name : ("dataset-" + (i+1));
    name = name.replace(/[\\\/\:\*\?\"\<\>\|]/g, "-"); // caractères interdits Windows

    var outFile = new File(outFolder.fsName + "/" + name + ".jpg");
    doc.saveAs(outFile, jpgOpt, true, Extension.LOWERCASE);
}

alert("Export terminé : " + doc.dataSets.length + " JPG générés.");