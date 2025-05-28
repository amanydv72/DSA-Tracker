// Function to export progress data as JSON
export const exportProgressData = (progress, startDate) => {
  const exportData = {
    progress,
    startDate,
    exportDate: new Date().toISOString(),
    version: '1.0'
  };

  const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `dsa-progress-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// Function to import progress data from JSON
export const importProgressData = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        
        // Validate imported data
        if (!data.progress || !data.startDate) {
          throw new Error('Invalid data format');
        }

        // Validate progress data structure
        const isValidProgress = Object.entries(data.progress).every(([day, data]) => {
          const dayNum = parseInt(day);
          return dayNum >= 1 && dayNum <= 35 && 
                 (!data.problemsSolved || data.problemsSolved >= 0);
        });

        if (!isValidProgress) {
          throw new Error('Invalid progress data structure');
        }

        resolve(data);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };

    reader.readAsText(file);
  });
};

// Function to validate progress data
export const validateProgressData = (progress) => {
  if (!progress || typeof progress !== 'object') {
    return false;
  }

  return Object.entries(progress).every(([day, data]) => {
    const dayNum = parseInt(day);
    return dayNum >= 1 && dayNum <= 35 && 
           (!data.problemsSolved || data.problemsSolved >= 0) &&
           (!data.completed || typeof data.completed === 'boolean') &&
           (!data.completedAt || typeof data.completedAt === 'string');
  });
}; 