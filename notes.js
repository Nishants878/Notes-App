const fs = require('fs')
const chalk = require('chalk')

const addNote = (title,body) =>{
    const notes = loadNotes()

    const duplicateNotes = notes.filter((note)=>{
        return note.title === title
    })
     
    if(duplicateNotes.length===0){
            
        notes.push({
            title:title,
            body:body,
    
        })
        console.log(notes)
        saveNotes(notes)
        console.log(chalk.green.inverse.bold('Notes Added successfully'))
    }else{
        console.log(chalk.red.inverse.bold('Note Already present'))
    }

    
} 

const removeNote = (title) =>{
    const notes = loadNotes()
    const notesKeep = notes.filter((note)=>{   //contains all the note which do not match title
        return note.title !== title
    })
    if(notesKeep.length < notes.length){
        console.log(chalk.inverse.green.bold(`Removing the note = ${title}`))
        saveNotes(notesKeep)
    }else{
        console.log(chalk.inverse.red.bold('No note with this title found'))
    }
}

const loadNotes = () =>{
       try {
        
        const dataBuffer = fs.readFileSync('notes.json')
        const dataString = dataBuffer.toString()
        return JSON.parse(dataString)
           
       } catch (error) {

           return []
       }

}

const listNotes = () => {
    console.log(chalk.inverse('Your notes...'))
    const notes = loadNotes()

    notes.forEach((note) => {
        console.log(chalk.inverse.blue(note.title))
    });
}


const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)

    if (note) {
        console.log(chalk.inverse(note.title))
        console.log(chalk.inverse(note.body))
    } else {
        console.log(chalk.inverse.red('No note found. '))
    }
} 




const saveNotes = (notes) =>{
    fs.writeFileSync('notes.json', JSON.stringify(notes))
    
}

module.exports ={
    addNote:addNote,
    removeNote:removeNote,
    listNotes:listNotes,
    readNote:readNote
}