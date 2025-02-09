import fs from 'fs'
import path from 'path'


function saveFileToStatic(tempPath, staticFolder) {
    if (!fs.existsSync(staticFolder)) {
        fs.mkdirSync(staticFolder, { recursive: true });
    }

    const fileName = path.basename(tempPath); 
    const newFilePath = path.join(staticFolder, fileName);

    fs.copyFile(tempPath, newFilePath, (copyErr) => {
        if (copyErr) {
            console.error('Ошибка при копировании файла:', copyErr);
            return;
        }

        fs.unlink(tempPath, (unlinkErr) => {
            if (unlinkErr) {
                console.error('Ошибка при удалении временного файла:', unlinkErr);
                return;
            }
            console.log('Файл успешно перемещен в:', newFilePath);
        });
    });

    return fileName.split('/').at(-1); 

}



export {saveFileToStatic}