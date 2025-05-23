import { create } from 'zustand';
import { apiClient } from '@/api/client';
import { Automation } from '@/api/types';

interface AutomationStore {
  automations: Automation[];
  isLoading: boolean;
  error: string | null;
  fetchAutomations: () => Promise<void>;
  deleteAutomation: (id: string) => void;
  updateAutomationById: (automationId: string, nodeId: string, value: string, field: string) => void;
  deleteComponent: (automationId: string, nodeId: string) => void;
}

const fetchAutomations = async () => {
  try {
    const response = await apiClient.get('/api/automations');
    const data = Array.isArray(response.data) ? response.data : response.data.data || [];
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const useAutomationStore = create<AutomationStore>((set) => ({
  automations: [],
  isLoading: true,
  error: null,
  fetchAutomations: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await fetchAutomations();
      set({ automations: data, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch automations', isLoading: false });
    }
  },
  deleteAutomation: (id: string) => {
    set((state) => ({
      automations: state.automations.filter(automation => automation.id !== id)
    }));
  },
  updateAutomationById: (automationId: string, nodeId: string, value: string, field: string) => 
    set((state) => ({
      automations: state.automations.map(automation => 
        automation.id === automationId ? { ...automation, components: automation.components.map(component => 
          component.id === nodeId ? { ...component, content: component.content.map(content => 
            content.id === field ? { ...content, value } : content
          ) } : component
        ) } : automation
      )
    })),
  deleteComponent: (automationId: string, nodeId: string) => 
    set((state) => ({
      automations: state.automations.map(automation => 
        automation.id === automationId ? {
          ...automation,
          components: automation.components.filter(component => component.id !== nodeId)
        } : automation
      )
    })),
}));

// Initial fetch
fetchAutomations().then(data => {
  useAutomationStore.setState({ automations: data, isLoading: false });
}).catch(error => {
  console.error('API Error:', error);
  useAutomationStore.setState({ error: 'Failed to fetch automations', isLoading: false });
}); 