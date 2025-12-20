export function ParseGPX(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            try{
                const xmlString = e.target.result;
                const parser = new DOMParser();

                const xmlDoc = parser.parseFromString(xmlString, "text/xml");

                const trackPoints = xmlDoc.querySelectorAll("trkpt");

                const coordinate = Array.from(trackPoints).map((point) => ({
                    lat : parseFloat(point.getAttribute("lat")),
                    long : parseFloat(point.getAttribute("lon")),
                    ele : parseFloat(point.querySelector("ele")?.textContent || 0)
                }))

                resolve(coordinate);

            } catch(error){
                reject(error)
            }
        }

        reader.onerror = (err) => reject(err);
        reader.readAsText(file);
    });
}