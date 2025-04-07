import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Container, Row } from 'react-bootstrap';
import { ArrowLeftCircleIcon, SearchIcon, MicIcon } from "lucide-react";
import { Input } from "../../components/ui/input";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface ActiveIngredient {
    id: number;
    name: string;
    description: string;
    medicationCount: number;
    totalStock: number;
  }

export const RevisarStock = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");

    // Sample data - replace with your actual data source
    const activeIngredients: ActiveIngredient[] = [
        { 
            id: 1, 
            name: "Ácido Acetilsalicílico", 
            description: "Antiinflamatorio no esteroideo (AINE)",
            medicationCount: 3,
            totalStock: 450
        },
        { 
            id: 2, 
            name: "Omeprazol", 
            description: "Inhibidor de la bomba de protones",
            medicationCount: 2,
            totalStock: 280
        },
        { 
            id: 3, 
            name: "Metformina", 
            description: "Antidiabético oral",
            medicationCount: 4,
            totalStock: 600
        },
        { 
            id: 4, 
            name: "Amoxicilina", 
            description: "Antibiótico betalactámico",
            medicationCount: 3,
            totalStock: 320
        },
    ];

    const filteredIngredients = activeIngredients.filter(ingredient => 
        ingredient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ingredient.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Container fluid>
            <div className="bg-white">
                <div className="bg-white">    
                    {/* Header */}
                    <Row className="bg-white">
                        <div>
                            {/* Button */}
                            <Button
                                variant="ghost"
                                onClick={() => navigate("/medico")}
                            >
                            <ArrowLeftCircleIcon className="w-20 h-20"/>
                            </Button>
                            {/* Title */}
                            <Row className="text-center">
                                <h1 className="text-xl font-semibold"> Revisar stock </h1>
                                <hr />
                            </Row>
                            {/* Search bar */}
                            <div className="flex items-center gap-1 bg-m3syslightsurface-container-high rounded-[28px] p-1">
                                <div className="flex w-10 h-10 items-center justify-center">
                                    <SearchIcon className="w-5 h-5" />
                                </div>
                                <Input
                                    className="flex-1 border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                                    placeholder="Buscar principio activo"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <div className="flex w-10 h-10 items-center justify-center">
                                    <MicIcon className="w-5 h-5" />
                                </div>
                            </div>
                        </div>
                    </Row>
                    {/* Active Ingredients List */}
                    <div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                            {filteredIngredients.map((ingredient) => (
                                <Card key={ingredient.id}>
                                    <CardContent className="p-4">
                                        <div className="flex justify-between items-center">
                                            <div className="flex-1">
                                                <h2 className="text-lg font-semibold text-[#1E1E1E]">{ingredient.name}</h2>
                                                <p className="text-sm text-[#757575]">{ingredient.description}</p>
                                                <div className="flex gap-4 mt-2">
                                                    <p className="text-sm font-medium text-[#2C2C2C]">
                                                        {ingredient.medicationCount} medicamentos
                                                    </p>
                                                    <p className="text-sm font-medium text-[#2C2C2C]">
                                                        Stock total: {ingredient.totalStock} unidades
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {/* Footer (falta poner símbolos y poder navegar entre páginas al apretarlos)*/}
            <div className="d-flex justify-content-around border-top pt-2 mt-3 text-center text-muted" style={{ position: 'fixed', bottom: 0, width: '100%', background: '#f8f9fa' }}>
                <div style={{ fontSize: '0.75rem' }}> Stock </div>
                <div style={{ fontSize: '0.75rem' }}> Prescripciones </div>
                <div style={{ fontSize: '0.75rem' }}> Recetas </div>
            </div>
        </Container>
    );
};

export default RevisarStock;