import express from 'express'
import cors from 'cors'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)
const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())

// Launch the fingerprint capture application
app.post('/api/launch-app', async (req, res) => {
  const appPath = 'C:\\Program Files (x86)\\Suprema\\RealScan\\SDK V1.8.5\\bin\\RealScanUICPP.exe'
  
  try {
    // Check if the app exists and launch it
    exec(`start "" "${appPath}"`, (error) => {
      if (error) {
        console.error('Error launching app:', error)
        return res.status(500).json({ 
          success: false, 
          error: 'Failed to launch application. Please ensure the app is installed at the specified path.' 
        })
      }
      res.json({ success: true, message: 'Application launched successfully' })
    })
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ 
      success: false, 
      error: 'Failed to launch application' 
    })
  }
})

app.listen(PORT, () => {
  console.log(`🚀 Fingerprint capture service running on http://localhost:${PORT}`)
  console.log(`Ready to launch RealScanUICPP.exe`)
})
