const fs = require("fs")
const path = require("path")

async function readDirectory(filePath) {
    //path for every folder or file
  const data = await fs.readdirSync(filePath)
  //we check item type, and we leave only a folders
  const folders = data.filter((item) => fs.lstatSync(item).isDirectory())
  //operation with every folder
  folders.map((folder) => {
    //create info.json
    const newFile = path.join(filePath, `/${folder}` + `/info.json`)
    //modify text in every file
    fs.readdir("./", (err, files) => {
      if (err) return err
      //Who and how many have files in folder
      fs.readdir(folder, (err, file) => {
        if (err) return err
        fs.writeFile(
          newFile, //file path
          //file content
          `${newFile} + ${file.length} + ${folders.length}`,
          () => {
            console.log(newFile)
          }
        )
      })
    })
  })
}

readDirectory(path.resolve(__dirname))
