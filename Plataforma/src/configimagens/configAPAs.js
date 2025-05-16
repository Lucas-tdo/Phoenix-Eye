const multer = require('multer');

const diretorio = 'public/assets/APAs';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, diretorio) 
  },
  
  filename: (req, file, cb) => {
    
    const extensaoArquivo = file.originalname.split('.').pop();

    var hoje = new Date()
    var ano =  String(hoje.getFullYear())
    var mes =  String(hoje.getMonth()+1)
    var dia =  String(hoje.getDate())
    var horas = String(hoje.getHours())
    var minutos =  String(hoje.getMinutes())
    var segundos = String(hoje.getSeconds())
    var nome = `${ano}-${mes}-${dia}_${horas}_${minutos}_${segundos}`
    cb(null, `${nome}.${extensaoArquivo}`)
  }
});

module.exports = multer({ storage });