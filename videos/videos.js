
class YouTubeLinkExtractor {
    constructor(apiUrl) {
      this.apiUrl = apiUrl;
    }
  
    async fetchVideos() {
      try {
        const response = await fetch(this.apiUrl);
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error fetching videos:', error);
        return [];
      }
    }
  
    async renderVideos(containerId) {
      const videos = await this.fetchVideos();
      const container = document.getElementById(containerId);
      if (!container) {
        console.error(`Container element with ID ${containerId} not found.`);
        return;
      }
      container.innerHTML = ''; // Limpiar el contenedor antes de agregar los videos
  
      videos.forEach(video => {
        const iframe = document.createElement('iframe');
        iframe.width = '560';
        iframe.height = '315';
        iframe.src = `https://www.youtube.com/embed/${video.youtubeUrl}`;
        iframe.title = "YouTube video player";
        iframe.frameborder = "0";
        iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
        iframe.allowFullscreen = true;
  
        const videoContainer = document.createElement('div');
        videoContainer.classList.add('video-container');
        videoContainer.appendChild(iframe);
  
        container.appendChild(videoContainer);
      });
    }
  }
  
  // Uso de la clase YouTubeLinkExtractor
  const extractor = new YouTubeLinkExtractor('http://localhost:3001/api/videos'); // Reemplaza la URL por la ruta correcta de tu API
  extractor.renderVideos('videoContainer'); // Reemplaza 'videoContainer' por el ID del contenedor HTML donde deseas mostrar los videos
  
  module.exports = app;