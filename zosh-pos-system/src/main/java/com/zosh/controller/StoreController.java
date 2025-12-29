package com.zosh.controller;

import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.zosh.domain.StoreStatus;
import com.zosh.mapper.StoreMapper;
import com.zosh.model.User;
import com.zosh.payload.dto.StoreDto;
import com.zosh.payload.response.ApiResponse;
import com.zosh.service.StoreService;
import com.zosh.service.UserService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/store")
@RequiredArgsConstructor
public class StoreController {
    private final StoreService storeService;
    private final UserService userService;

    // done
    @PostMapping
    public ResponseEntity<StoreDto> createStore(@RequestBody StoreDto storeDto,
            @RequestHeader("Authorization") String token) {
        User user = userService.getUserFromJwtToken(token);
        return ResponseEntity.ok(storeService.createStore(storeDto, user));
    }

    // done
    @GetMapping()
    public ResponseEntity<List<StoreDto>> getAllStore(@RequestHeader("Authorization") String token) {
        User user = userService.getUserFromJwtToken(token);
        return ResponseEntity.ok(storeService.getAllStores());
    }

    // done
    @GetMapping("/admin")
    public ResponseEntity<StoreDto> getStoreByAdmin(@RequestHeader("Authorization") String token) {
        return ResponseEntity.ok(StoreMapper.toDto(storeService.getStoreByAdmin()));
    }

    // need to create employee first then test it
    @GetMapping("/employee")
    public ResponseEntity<StoreDto> getStoreByEmployee(@RequestHeader("Authorization") String token) {
        return ResponseEntity.ok(storeService.getStoreByEmployee());
    }

    // done
    @PutMapping("/{id}")
    public ResponseEntity<StoreDto> updateStore(@PathVariable Long id, @RequestBody StoreDto storeDto) {
        return ResponseEntity.ok(storeService.updateStore(id, storeDto));
    }

    // done
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteStore(@PathVariable Long id) {
        storeService.deleteStore(id);
        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setMessage("Store Deleted");
        return ResponseEntity.ok(apiResponse);
    }

    // done
    @PutMapping("/{id}/moderate")
    public ResponseEntity<StoreDto> moderateStore(@PathVariable Long id, @RequestParam StoreStatus status) {
        return ResponseEntity.ok(storeService.moderateStore(id, status));
    }

    // done
    @GetMapping("/{id}")
    public ResponseEntity<StoreDto> getStoreById(@PathVariable Long id, @RequestHeader("Authorization") String token) {
        User user = userService.getUserFromJwtToken(token);
        return ResponseEntity.ok(storeService.getStoreById(id));
    }
}
