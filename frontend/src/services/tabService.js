class TabService {
    constructor() {
      this.isActive = true;
      this.listeners = new Set();
      this.init();
    }
  
    init() {
      // Listen for visibility change
      document.addEventListener('visibilitychange', this.handleVisibilityChange);
      // Listen for window focus
      window.addEventListener('focus', this.handleFocus);
      // Listen for window blur
      window.addEventListener('blur', this.handleBlur);
    }
  
    handleVisibilityChange = () => {
      this.isActive = !document.hidden;
      this.notifyListeners();
    };
  
    handleFocus = () => {
      this.isActive = true;
      this.notifyListeners();
    };
  
    handleBlur = () => {
      this.isActive = false;
      this.notifyListeners();
    };
  
    addListener(listener) {
      this.listeners.add(listener);
      return () => this.listeners.delete(listener);
    }
  
    notifyListeners() {
      this.listeners.forEach(listener => listener(this.isActive));
    }
  
    isTabActive() {
      return this.isActive;
    }
  
    cleanup() {
      document.removeEventListener('visibilitychange', this.handleVisibilityChange);
      window.removeEventListener('focus', this.handleFocus);
      window.removeEventListener('blur', this.handleBlur);
      this.listeners.clear();
    }
  }
  
  // Create a singleton instance
  const tabService = new TabService();
  
  export default tabService;