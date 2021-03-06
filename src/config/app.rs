use crate::api::*;
use actix_web::web;

pub fn config_services(cfg: &mut web::ServiceConfig) {
    info!("Configuring routes...");
    cfg.service(
        web::scope("/api")
            .service(
                web::resource("/ws").route(web::get().to(websocket_controller::ws_index))
            )
            .service(ping_controller::ping)
            .service(
                web::scope("/auth")
                    .service(
                        web::resource("/signup")
                            .route(web::post().to(account_controller::signup))
                    )
                    .service(
                        web::resource("/login")
                            .route(web::post().to(account_controller::login))
                    )
                    .service(
                        web::resource("/logout")
                            .route(web::post().to(account_controller::logout))
                    )
                    .service(
                        web::resource("/me")
                            .route(web::post().to(account_controller::me))
                    )
            )
            .service(
                web::scope("/admin")
                    .service(
                        web::resource("/hardware")
                            .route(web::post().to(hardware_controller::insert))
                    )
                    .service(
                        web::resource("sensor")
                            .route(web::post().to(sensor_controller::insert))
                    )
                )
            .service(
                web::scope("/sensor-types")
                    .service(
                        web::resource("/get")
                            .route(web::post().to(sensor_controller::get_sensor_types))
                    )
                )
            .service(
                web::scope("/sensor")
                    .service(
                        web::resource("/log/write")
                            .route(web::post().to(sensor_controller::write_to_log))
                    )
                    .service(
                        web::resource("/log/read")
                            .route(web::post().to(sensor_controller::read_from_log))
                    )
                    .service(
                        web::resource("/log/read-v2")
                            .route(web::post().to(sensor_controller::read_from_log_v2))
                    )
                )
            .service(
                web::scope("/hardware")
                    .service(
                        web::resource("/get")
                            .route(web::post().to(hardware_controller::get_hardware_for_user))
                    )
                    .service(
                        web::resource("/sensors/get")
                            .route(web::post().to(hardware_controller::get_hardware_sensors_for_user))
                    )
                )
            .service(
                web::scope("/address-book")
                    .service(
                        web::resource("")
                            .route(web::get().to(address_book_controller::find_all))
                            .route(web::post().to(address_book_controller::insert))
                    )
                    .service(
                        web::resource("/{id}")
                            .route(web::get().to(address_book_controller::find_by_id))
                            .route(web::put().to(address_book_controller::update))
                            .route(web::delete().to(address_book_controller::delete))
                    )
                    .service(
                        web::resource("/query/{query}")
                            .route(web::get().to(address_book_controller::query))   
                    )
            )
    );
}