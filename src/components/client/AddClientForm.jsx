import { useMutation, useQueryClient } from '@tanstack/react-query';
import { clientService } from '../../services/clientService';
import './AddClientForm.css';

const AddClientForm = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (newClient) => clientService.create(newClient),
        onSuccess: () => {
            queryClient.invalidateQueries(['clients']);
            alert('Client ajouté avec succès !');
        },
        onError: (error) => {
            const message = error.response?.data?.message || "Erreur serveur";
            alert(message);
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        mutation.mutate(data);
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit} className="client-form">

                <div className="input-group">
                    <input
                        className="input-field"
                        name="username"
                        placeholder="Username"
                        required
                    />
                </div>

                <div className="input-group">
                    <input
                        className="input-field"
                        name="password"
                        type="password"
                        placeholder="Mot de passe"
                        required
                    />
                </div>

                <div className="input-group">
                    <input
                        className="input-field"
                        name="email"
                        type="email"
                        placeholder="Email"
                        required
                    />
                </div>

                <div className="input-group">
                    <input
                        className="input-field"
                        name="name"
                        placeholder="Nom complet"
                        required
                    />
                </div>

                <div className="form-actions">
                    <button type="submit" disabled={mutation.isLoading}>
                        {mutation.isLoading ? 'Envoi...' : 'Créer'}
                    </button>
                </div>

            </form>
        </div>
    );
};

export default AddClientForm;
