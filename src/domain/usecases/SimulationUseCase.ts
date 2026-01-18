export interface SimulationStep {
  layer: string;
  text: string;
}

export interface SimulationUpdate {
  stepIndex: number;
  activeLayer: string;
  isFinished: boolean;
}

export class SimulationUseCase {
  private updateCallback: (update: SimulationUpdate) => void;
  private steps: SimulationStep[];

  constructor(updateCallback: (update: SimulationUpdate) => void) {
    this.updateCallback = updateCallback;
    this.steps = [
      { layer: 'adapters', text: 'HTTP İsteği Geldi (POST /register)' },
      { layer: 'usecases', text: 'RegisterUser Use Case Tetiklendi' },
      { layer: 'entities', text: 'User Nesnesi Oluşturuldu ve Doğrulandı' },
      { layer: 'infrastructure', text: 'Veritabanına Kayıt Edildi' },
      { layer: 'adapters', text: 'İşlem Başarılı Yanıtı Döndü' }
    ];
  }

  start() {
    let currentStep = 0;
    
    const interval = setInterval(() => {
      if (currentStep < this.steps.length) {
        this.updateCallback({
          stepIndex: currentStep,
          activeLayer: this.steps[currentStep].layer,
          isFinished: false
        });
        currentStep++;
      } else {
        clearInterval(interval);
        this.updateCallback({ stepIndex: -1, activeLayer: 'entities', isFinished: true });
      }
    }, 1500);

    return () => clearInterval(interval);
  }
}
