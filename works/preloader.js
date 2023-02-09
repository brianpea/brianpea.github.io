//preloader: preloads homepage gifs

var csvPreload = new XMLHttpRequest();
csvPreload.open("GET", "works/works.csv");
csvPreload.responseType = "blob";
csvPreload.send();

csvPreload.onload = function () {

    var preloads = csvPreload.response;

    var csvParser = new SimpleExcel.Parser.CSV();
    csvParser.setDelimiter(",");
    csvParser.loadFile(preloads, function () {

        var worksList = csvParser.getSheet();

        for (var i = 1; i < worksList.length; i++) {

            var work = worksList[i];

            var workFile = work[1];
            var workFormat = work[4];

            var preloadHref = "works/" + workFile + "_1200." + workFormat;
            var preloadSrcset = "works/" + workFile + "_300." + workFormat + " 300w, works/" + workFile + "_600." + workFormat + " 600w, works/" + workFile + "_1200." + workFormat + " 1200w";

            var preload = document.createElement("link");
            preload.rel = "preload";
            preload.as = "image";
            preload.href = preloadHref;
            preload.imageSrcset = preloadSrcset;
            preload.imageSizes = "(max-width:750px) calc(65vw - 50px), calc(25vw - 25px)"
            document.head.appendChild(preload);

        }
    });
}