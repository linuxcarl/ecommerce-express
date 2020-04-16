const fs = require('fs');

function getKeysFromOptions(options){
    const {settings, _locals, ...objectKeys } = options;
    return Object.keys(objectKeys)
}

function getRenderedContent(content, options) {
    const keys = getKeysFromOptions(options);
    let contentString = content.toString();

    return keys.reduce(
        (contentString, key) =>
            contentString.replace(new RegExp(`\{${key}\}`, 'gi'), options[key]) ,
        content.toString()
       
    );
    /*for (let key of keys) {
        contentString = contentString.replace(
            new RegExp(`\{${key}\}`, 'gi'),
            options[key]
        )        
    }
    return contentString;*/
}
function expressJxs(filePath, options, cb) {
    fs.readFile(filePath, (error, content) => {
        if (error) {
            return cb(error);
        }
        const rendered = getRenderedContent(content, options);

        return cb(null, rendered)
    })
}

module.exports = expressJxs;