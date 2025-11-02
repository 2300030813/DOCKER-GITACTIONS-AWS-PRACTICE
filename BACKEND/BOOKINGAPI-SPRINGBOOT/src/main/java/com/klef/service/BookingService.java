package com.klef.service;

import java.util.List;
import com.klef.entity.Booking;

public interface BookingService {
    Booking addBooking(Booking booking);
    List<Booking> getAllBookings();
    Booking getBookingById(Long bookingId);
    Booking updateBooking(Booking booking);
    void deleteBookingById(Long bookingId);
}
