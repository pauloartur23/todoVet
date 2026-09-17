package br.edu.ufersa.todoVet.features.Venda;
import br.edu.ufersa.todoVet.features.VendaRequestDTO;
import br.edu.ufersa.todoVet.features.VendaResponseDTO;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/vendas")
public class VendaController {
    @GetMapping
    public ResponseEntity<List<VendaResponseDTO>> listarTodas() {
        return null;
    }

    @GetMapping("/{id}")
    public ResponseEntity<VendaResponseDTO> buscarPorId(@PathVariable Long id) {
        return null;
    }

    @PostMapping
    public ResponseEntity<VendaResponseDTO> registrar(@RequestBody @Valid VendaRequestDTO novaVenda) {
        return null;
    }

    //Hierarquia RESTful - vendas pertencem ao cliente
    @GetMapping("/clientes/{clienteId}")
    public ResponseEntity<List<VendaResponseDTO>> listarPorCliente(@PathVariable Long clienteId) {
        return null;
    }
}
