const chalk = require('chalk');
const yargs = require('yargs')
const notes = require('./notes')


// console.log(chalk.blue(yargs.argv['title']))
// console.log(chalk.blue(yargs.argv['body']))

yargs.command({
    command:'add',
    describe:"Adds a note",
    builder:{
         title:{
             describe:'Note title',
             demandOption:true,
             type:"string"
         },

         body:{
            describe:'Note body',
            demandOption:true,
            type:"string"
        }
    },
    handler: function(argv){
        notes.addNote(argv.title, argv.body)
   
    // console.log(`Title: ${argv.title}`)
    // console.log(`Body: ${argv.body}`)
    }
})

yargs.command({
    command:'remove',
    describe:"Remove a note",
    builder:{
        title:{
            describe:'Title to remove',
            demandOption:true,
            type:"string"
        },

      
   },
    
    handler: function(argv){
        notes.removeNote(argv.title)
    }
})

yargs.command({
    command: 'list',
    describe: 'Lists all notes',
    handler: function () {
        notes.listNotes()
    }
})

yargs.command({
    command:'read',
    describe:"Read a note",
    handler: function(argv){
        notes.readNote(argv.title)
    }
})

yargs.parse() // it will only print whatever we write after node index.js


