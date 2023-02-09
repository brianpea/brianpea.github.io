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

            if (workFormat.toString() == "gif") {

                var preloadHref = "works/" + workFile + "_1200.gif";
                var preloadSrcset = "works/" + workFile + "_600.gif, works/" + workFile + "_1200.gif 2x";

                var preload = document.createElement("link");
                preload.rel = "preload";
                preload.as = "image";
                preload.href = preloadHref;
                preload.imageSrcset = preloadSrcset;
                document.head.appendChild(preload);

            }
        }
    });
}